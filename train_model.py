import os
import tensorflow as tf
# Using direct keras imports as they are often more stable for IDE intellisense in TF 2.x
from keras.preprocessing.image import ImageDataGenerator
from keras.applications import MobileNetV2
from keras.layers import Dense, GlobalAveragePooling2D, Dropout
from keras.models import Model
from keras.optimizers import Adam

# 1. Setup Data Paths
# Adjust these paths based on how the zip file extracts
BASE_DIR = './dataset'
TRAIN_DIR = os.path.join(BASE_DIR, 'New Plant Diseases Dataset(Augmented)', 'New Plant Diseases Dataset(Augmented)', 'train')
VALID_DIR = os.path.join(BASE_DIR, 'New Plant Diseases Dataset(Augmented)', 'New Plant Diseases Dataset(Augmented)', 'valid')

# Fallback to root dataset folders if nested structure is not found
if not os.path.exists(TRAIN_DIR):
    TRAIN_DIR = os.path.join(BASE_DIR, 'train')
    VALID_DIR = os.path.join(BASE_DIR, 'valid')

print(f"Using Training Directory: {TRAIN_DIR}")
print(f"Using Validation Directory: {VALID_DIR}")

# 2. Setup Hyperparameters
IMG_SIZE = 224 # MobileNetV2 uses 224x224 images
BATCH_SIZE = 32
EPOCHS = 50 # Increased epochs, EarlyStopping will handle the actual stop point

# 3. Data Generators
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    validation_split=0.2
)

valid_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2
)

print("Loading Training Data...")
train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training',
    seed=42
)

print("Loading Validation Data...")
valid_generator = valid_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation',
    seed=42
)

NUM_CLASSES = train_generator.num_classes
print(f"Found {NUM_CLASSES} different crop disease classes.")

# 4. Build the Model
print("Downloading Base Model (MobileNetV2)...")
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(IMG_SIZE, IMG_SIZE, 3)
)

base_model.trainable = False

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(512, activation='relu')(x)
x = Dropout(0.5)(x)
predictions = Dense(NUM_CLASSES, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Add Callbacks for better convergence
early_stopping = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True,
    verbose=1
)

reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.2,
    patience=3,
    min_lr=1e-6,
    verbose=1
)

# 5. Train the Model
print("Starting Training!")
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // BATCH_SIZE,
    validation_data=valid_generator,
    validation_steps=valid_generator.samples // BATCH_SIZE,
    epochs=EPOCHS,
    callbacks=[early_stopping, reduce_lr]
)

# 6. Save the Model
MODEL_NAME = "krishi_disease_model"
model.save(f"{MODEL_NAME}.h5")
print(f"Model saved locally as {MODEL_NAME}.h5")

# Convert to TensorFlow Lite
print("Converting to TensorFlow Lite...")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()

with open(f"{MODEL_NAME}.tflite", "wb") as f:
    f.write(tflite_model)

print(f"Success! Final lightweight model saved as {MODEL_NAME}.tflite")
