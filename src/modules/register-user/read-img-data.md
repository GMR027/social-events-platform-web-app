const [userImage, setUserImage] = useState('');

if ( userImage ) newUserPayload.data.attributes.img_picture = userImage.replace(/^data:image\/(png|jpg);base64,/, '');

```
<div className='RegisterUser__user-image'></div>
<input type='file' name='file' onChange={(e: any) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e: any) => {
    props.setUserImage(e.target.result);
  };
  reader.readAsDataURL(file);
}}/>
```