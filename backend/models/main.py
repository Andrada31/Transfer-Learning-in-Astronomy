import os
import pickle
import numpy as np
import scipy as sp
import pandas as pd
import plotly.express as px
import tensorflow as tf
from keras import Model
from keras.src.legacy.preprocessing.image import ImageDataGenerator
from keras.src.saving import load_model
from matplotlib import pyplot as plt
from backend.models.scripts.custom_model import model
from backend.models.scripts.data_ploting import class_names
import warnings
warnings.filterwarnings("ignore", category=UserWarning, module="keras")

TF_ENABLE_ONEDNN_OPTS=0

"""
    DATA PREPROCESSING
"""

#DEFINE PATHS FOR THE DATA
nebula_dir = 'data/nebulae_vs_galaxies/DSO_images/Nebula'
galaxy_dir = 'data/nebulae_vs_galaxies/DSO_images/Galaxy'

training_dir = 'data/nebulae_vs_galaxies/training'
validation_dir = 'data/nebulae_vs_galaxies/validation'
test_dir = 'data/nebulae_vs_galaxies/test'

training_nebulae = os.path.join(training_dir, 'nebulae/')
validation_nebulae = os.path.join(validation_dir, 'nebulae/')
test_nebulae = os.path.join(test_dir, 'nebulae/')

training_galaxies = os.path.join(training_dir, 'galaxies/')
validation_galaxies = os.path.join(validation_dir, 'galaxies/')
test_galaxies = os.path.join(test_dir, 'galaxies/')

INCLUDE_TEST = True
TRAIN_MODEL = False
LOAD_MODEL = True

#SEE NUMBER OF IMAGES IN EACH FOLDER
print(len(os.listdir(nebula_dir)))
print(len(os.listdir(galaxy_dir)))

#SPLIT THE DATA INTO TRAINING, VALIDATION AND TEST SETS
# split_data(nebula_dir, training_nebulae, validation_nebulae, test_nebulae,INCLUDE_TEST, 0.8)
# split_data(galaxy_dir, training_galaxies, validation_galaxies,test_galaxies,INCLUDE_TEST, 0.8)


#CREATED IMAGE DATA GENERATORS with data augmentation for training
train_gen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True
)

validation_gen =  ImageDataGenerator(
        rescale=1./255.)

if INCLUDE_TEST:
    test_gen =  ImageDataGenerator(
            rescale=1./255.)

train_generator = train_gen.flow_from_directory(
        training_dir,
        target_size=(150, 150),
        batch_size=64,
        class_mode='binary')
validation_generator = validation_gen.flow_from_directory(
        validation_dir,
        target_size=(150, 150),
        batch_size=64,
        class_mode='binary')

if INCLUDE_TEST:
    test_generator = test_gen.flow_from_directory(
        test_dir,
        target_size=(150, 150),
        batch_size=64,
        class_mode='binary')


#RUN THIS FUNCTION FOR FINDING LARGE IMAGES IN THE DATASET
# find_large_images('data/nebulae_vs_galaxies/test')

#RESIZE the image fize if large images are found
# resize_images_in_folder('data/nebulae_vs_galaxies', max_size=500)

#PLOTTED DATA on white canvas
# plot_data(train_generator,7)
# plot_data(validation_generator,7)
# if INCLUDE_TEST:
#     plot_data(test_generator, 10)


"""
    TRAIN THE MODEL
"""
model.compile(optimizer=tf.keras.optimizers.RMSprop(learning_rate=0.001),
              loss='sparse_categorical_crossentropy',
              metrics = ['accuracy'])

if TRAIN_MODEL:
    r = model.fit(
            train_generator,
            epochs=100,
            validation_data=validation_generator)
    with open('saved/training_history.pkl', 'wb') as f:
        pickle.dump(r.history, f)
    model.save('nebulae_v_galaxies.h5')

"""
    LOAD MODEL
"""
if LOAD_MODEL:
    model = load_model('saved/nebulae_v_galaxies.h5')
    with open('saved/training_history.pkl', 'rb') as f:
        history = pickle.load(f)

"""
    EVALUATE THE MODEL
"""
# if INCLUDE_TEST:
#     model.evaluate(test_generator)
#
# if INCLUDE_TEST:
#     plot_prediction(test_generator, 10)
# plot_prediction(validation_generator, 10)


"""
    ACTIVATION MAPS
"""

gp_weights =  model.get_layer('dense').get_weights()[0]
activation_model = Model(model.inputs, outputs=(model.get_layer('conv2d_5').output, model.get_layer('dense_1').output))

test_images, test_labels = next(test_generator)
features, results = activation_model.predict(test_images)

def show_cam(image_index, features, results):
    features_for_img = features[image_index, :, :, :]
    prediction = np.argmax(results[image_index])
    class_activation_weights = gp_weights[:, prediction]
    class_activation_features = sp.ndimage.zoom(features_for_img, (150 / 30, 150 / 30, 1), order=2)
    cam_output = np.dot(class_activation_features, class_activation_weights)
    print('Predicted Class = ' + str(class_names[prediction]) + ', Probability = ' + str(
        results[image_index][prediction]))
    plt.imshow(test_images[image_index])

    if results[image_index][prediction] > 0.90:
        cmap_str = 'Greens'
    else:
        cmap_str = 'Blues'
    plt.imshow(cam_output, cmap=cmap_str, alpha=0.5)
    plt.show()

def show_maps(desired_class, num_maps):
    counter = 0
    for i in range(len(results)):
        if counter == num_maps:
            break
        if np.argmax(results[i]) == desired_class:
            counter += 1
            show_cam(i,features, results)


# show_maps(desired_class=0, num_maps=5)
# show_maps(desired_class=1, num_maps=5)


"""
    RESULTS
"""

results = pd.DataFrame(history)
print(results[['loss', 'accuracy', 'val_loss', 'val_accuracy']].tail())

#ACCURACY
acc_plot = px.line(results, y=[results['accuracy'], results['val_accuracy']], template="seaborn", color_discrete_sequence=['#fad25a', 'red'])
acc_plot.update_layout(
    title_font_color="#fad25a",
    xaxis=dict(color="#fad25a",title='Epochs'),
    yaxis=dict(color="#fad25a")
 )
# acc_plot.show()

#LOSS
loss_plot = px.line(results, y=[results['loss'], results['val_loss']], template="seaborn", color_discrete_sequence=['#fad25a', 'red'])
loss_plot.update_layout(
    title_font_color="#fad25a",
    xaxis=dict(color="#fad25a",title='Epochs'),
    yaxis=dict(color="#fad25a")
 )
# loss_plot.show()


#AVERAGE RESULTS
def compute_average_metrics(history):
    train_acc = np.mean(history['accuracy'])
    val_acc = np.mean(history['val_accuracy'])
    train_loss = np.mean(history['loss'])
    val_loss = np.mean(history['val_loss'])
    avg_metrics = {
        'Average Training Accuracy': train_acc,
        'Average Validation Accuracy': val_acc,
        'Average Training Loss': train_loss,
        'Average Validation Loss': val_loss
    }
    return avg_metrics

if LOAD_MODEL:
    model = load_model('saved/nebulae_v_galaxies.h5')
    with open('saved/training_history.pkl', 'rb') as f:
        history = pickle.load(f)
    avg_metrics = compute_average_metrics(history)
    for metric, value in avg_metrics.items():
        print(f"{metric}: {value:.4f}")
