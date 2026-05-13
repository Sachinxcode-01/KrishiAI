import os
import cv2
import logging

logging.basicConfig(level=logging.INFO)

class DatasetAgent:
    def __init__(self, target_size=(224, 224)):
        self.target_size = target_size
        self.logger = logging.getLogger("DatasetAgent")

    def process_dataset(self, folder_path):
        """Resizes images and saves them to a separate processed folder to avoid overwriting originals."""
        self.logger.info(f"Starting dataset processing for folder: {folder_path}")

        if not os.path.exists(folder_path):
            self.logger.error("Dataset folder does not exist!")
            return False

        processed_base_dir = os.path.join(folder_path, 'processed')
        if not os.path.exists(processed_base_dir):
            os.makedirs(processed_base_dir)

        for cls in os.listdir(folder_path):
            class_path = os.path.join(folder_path, cls)
            if not os.path.isdir(class_path) or cls == 'processed':
                continue

            processed_class_dir = os.path.join(processed_base_dir, cls)
            if not os.path.exists(processed_class_dir):
                os.makedirs(processed_class_dir)

            processed_count = 0
            for img_name in os.listdir(class_path):
                img_path = os.path.join(class_path, img_name)

                try:
                    # Read image
                    img = cv2.imread(img_path)
                    if img is not None:
                        # Resize image for MobileNetV2 / EfficientNet
                        img_resized = cv2.resize(img, self.target_size)

                        # Save to the processed folder instead of overwriting
                        processed_img_path = os.path.join(processed_class_dir, img_name)
                        cv2.imwrite(processed_img_path, img_resized)
                        processed_count += 1
                    else:
                        self.logger.warning(f"Corrupted or invalid image found and removed: {img_path}")
                        os.remove(img_path)
                except Exception as e:
                    self.logger.error(f"Error processing {img_path}: {e}")

            self.logger.info(f"Processed {processed_count} images for class '{cls}'.")

        self.logger.info("Dataset preprocessing complete. Resized images saved in 'processed' folder.")
        return True

if __name__ == "__main__":
    agent = DatasetAgent()
    # agent.process_dataset("../dataset") # Run this when you have your dataset folder
