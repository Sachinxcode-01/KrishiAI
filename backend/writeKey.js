const fs = require('fs');
const path = require('path');

const keyData = {
  "type": "service_account",
  "project_id": "krishi-ai-add0b",
  "private_key_id": "286833014ca411ab105e677b248ae573a2c678fd",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5Hopm88cCodnG\nyCqj2dnBAhU6+EBbo5WdizVpoYhccTPrFc7f62gJLIexpoHDt5+HcrShHUaljAGO\nFsvvrF82OlYSvMKfJcEHARhGk/k7Ey7zX1+JK3CtVYFCkjXpcNmV2Pziicg3Dkij\nsJ4AqS7Ig67OalT1YMcPOLQ4Fb0+yqqSsUtEmfn1iBasInPTLVKXcSdxUH+Vnb8c\nCwQryDsnp7ajzi4l+hNQUgqa25G17sTkme7aWyqgsRLZmdkvxuG5xakl18pDjwJt\nxUGgSmXYLcfj/PT8xsnggSxtTufskJiPrvp9EqxtjGts4q4iJw+taxH2u47ADalM\nTIcy773hAgMBAAECggEAD1yMzt4GGs5wPk38NthUOO9ZsGjrG0ej+dy0UBmM0aH9\ntVF8FyoHWjKJKJlo/YMicHiY62E87G4lr2MuJWuEA6Gb5KZoDpGRFuoU9/9dwFSX\nUfANQxpZGXMl3K66HU7laWlGE+zr0cDET5wPgn3HkXFW+09I0UtofVd+4gQQzhHa\nbC1nNyMuqxOjf2Lv5jZjJ55w17m3uD9Bp1Ae1yshz06+5R+nM9KJ2abAYMlCOuey\ndhGnhcie2rcWB0mvCg+3IfqNvIFIP/c+GdTpRW02dwp2pVvsBDkXapCRyLaIMkaN\nsagzEi7epoa0vyMDqoDg6da1GJ5uEoLX0sjL4scqiQKBgQDar0DfWP/im3+LOmPl\nu48Nl3UBH0aOH1jFytPbskcmhfzL10o36RjJzBZi/T7CGfv5A1c5heBwgnVKwK7o\nb4U1EIWcaUwGW4Jt9ysatxBDs/0vKG7TcD2mjFG4F1Hov3f450Ro3gwjy4zXewEZ\ngCHBKwFZwho/OsOEU9Xv5HQlaQKBgQDYtRAajYyaKrRthz966K3Q0uJ3pI+G4P2c\nNa69UrkswltuU6FKYzurtqGsDO74VM6cCpXLJTMg6NOFeLsBPQ7tN+VTBPp+Aln5\n9G7sJ3DHP9SzmJgxXtKlxC8n1EOZPjUKGnGPaI2fgl3CBlt8MICbMtYhqDLeXzqz\nViT4bRttuQKBgGCUpgH+PITISDwlPZlojHVkPriQJ4j9LyervIV65xGMe2lLW+v1\ndo0pJXnyfpUbBL2lTBCLn+QQudyZ3KWrGxmkgl3h40GriJ8oWlEiKHy+MUNyh/+5\nwoCb2DuFkRdJ+KJlAUGPT60/aKSCHqo0fLPjWmVZ5F2ohlEa9ZFNRD6BAoGBAJRp\ndEzrEhbnFkhIrvXq8lcohgawQcd6wNVBgpmQVNdNiDaHuddrHIud+R0Ogn65/gGp\0iqdIGXybiJjq5bOjTFy7XAs4ax4ycxAVdMPs9IRagdRgzGUoij6sdzSJzWE/+ga\nchln3k4Wh0WA+xiTUxB3AWVtfuECUP5PCeTFPFqpAoGAXaoA5vPwbOVpDiYWMnX9\nnIin6NEOX6n1LuNzSZOos40nPmOKccrTMCgH5o2A5D1iTSMXF0FAwZjYWcz81sXM\nmIsfzC+34VpZopFkd5NvUMLPMyuOmv9XVbT60AdQVMdxHqQ5wfypQu8ED+hjvTjL\nSsxxn5eD8M2eAuXe7dF86eE=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@krishi-ai-add0b.iam.gserviceaccount.com",
  "client_id": "106031304370072696871",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40krishi-ai-add0b.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

const filePath = path.join(__dirname, 'config', 'serviceAccountKey.json');
fs.writeFileSync(filePath, JSON.stringify(keyData, null, 2));
console.log('Successfully wrote serviceAccountKey.json');
