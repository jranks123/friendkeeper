import * as ImagePicker from "expo-image-picker";


export async function uploadImageAsync(uri: string) {
  const apiUrl = 'https://friendkeeper-269718.appspot.com/upload';


  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  formData.append('photo', {
    // @ts-ignore
    uri,
    name: `${Math.random().toString(13).replace('0.', '') }.${fileType}`,
    type: `image/${fileType}`,
  });

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}

export const pickImage = async (updateImage: (image: string) => void, setUploadingImage: (uploadingImage: boolean) => void) => {
  const result: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1
  });


  let uploadResponse, uploadResult;
  if (result.cancelled !== true) {
    try {
      setUploadingImage(true);
      uploadResponse = await uploadImageAsync(result.uri);
      uploadResult = await uploadResponse.json();
      setUploadingImage(false);
      console.log(`Image upload successful. Image stores at ${uploadResult.path}`)
      updateImage(uploadResult.path);
    } catch (e) {
      setUploadingImage(false);
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    }
  }
};

