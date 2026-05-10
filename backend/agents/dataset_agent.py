import os
import cv2
import logging

logging.basicConfig(level=logging.INFO)

class DatasetAgent:
    def __init__(self, target_size=(224, 224)):
        self.target_size = target_size
        self.logger = logging.getLogger("DatasetAgent")

    def process_dataset(self, folder_path):
        """Resizes all images in the dataset folders to the target size."""
        self.logger.info(f"Starting dataset processing for folder: {folder_path}")
        
        if not os.path.exists(folder_path):
            self.logger.error("Dataset folder does not exist!")
            return False

        for cls in os.listdir(folder_path):
            class_path = os.path.join(folder_path, cls)
            if not os.path.isdir(class_path):
                continue

            processed_count = 0
            for img_name in os.listdir(class_path):
                img_path = os.path.join(class_path, img_name)
                
                try:
                    # Read image
                    img = cv2.imread(img_path)
                    if img is not None:
                        # Resize image for MobileNetV2 / EfficientNet
                        img_resized = cv2.resize(img, self.target_size)
                        # Overwrite or save to a new processed folder
                        cv2.imwrite(img_path, img_resized)
                        processed_count += 1
                    else:
                        self.logger.warning(f"Corrupted or invalid image found and removed: {img_path}")
                        os.remove(img_path)
                except Exception as e:
                    self.logger.error(f"Error processing {img_path}: {e}")

            self.logger.info(f"Processed {processed_count} images for class '{cls}'.")
        
        self.logger.info("Dataset preprocessing complete.")
        return True

if __name__ == "__main__":
    agent = DatasetAgent()
    # agent.process_dataset("../dataset") # Run this when you have your dataset folder
