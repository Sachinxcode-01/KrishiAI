const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');
const { analyzeImage, diagnoseText } = require('./services/aiService');
const { dataset } = require('../frontend/src/data/dataset'); // Shared dataset

const server = new Server(
  {
    name: 'krishi-ai-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'diagnose_crop_image',
        description: 'Diagnose crop diseases from a base64 leaf image',
        inputSchema: {
          type: 'object',
          properties: {
            image: { type: 'string', description: 'Base64 encoded image' },
            description: { type: 'string', description: 'Optional farmer description' },
          },
          required: ['image'],
        },
      },
      {
        name: 'diagnose_crop_text',
        description: 'Diagnose crop diseases from symptom descriptions (text-only)',
        inputSchema: {
          type: 'object',
          properties: {
            symptoms: { type: 'string', description: 'Description of symptoms' },
          },
          required: ['symptoms'],
        },
      },
      {
        name: 'get_disease_info',
        description: 'Get treatment and symptom information for a specific disease from the encyclopedia',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Name of crop or disease' },
          },
          required: ['query'],
        },
      }
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'diagnose_crop_image') {
      const result = await analyzeImage(args.image, args.description);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }

    if (name === 'diagnose_crop_text') {
      const result = await diagnoseText(args.symptoms);
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    }

    if (name === 'get_disease_info') {
      const query = args.query.toLowerCase();
      const info = dataset.diseaseEncyclopedia.filter(d => 
        d.crop.en.toLowerCase().includes(query) || 
        d.disease.en.toLowerCase().includes(query)
      );
      return { content: [{ type: 'text', text: JSON.stringify(info, null, 2) }] };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      isError: true,
      content: [{ type: 'text', text: error.message }],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Krishi AI MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
