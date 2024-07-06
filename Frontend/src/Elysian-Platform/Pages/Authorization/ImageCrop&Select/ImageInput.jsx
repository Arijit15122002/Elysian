import React, { useRef } from 'react'

function ImageInput ({onImageSelected}) {

    const inputRef = useRef();

    //Hnalde the change event when a file is selected
    const handleOnChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                onImageSelected(reader.result);
            }
        }
    }

    const onChooseImage = () => {
        inputRef.current.click();
    }

  return (
    <div>

        {/* Hidden Input */}
        <input 
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: 'none' }}
        />

        <div onClick={onChooseImage}>
            Choose Image
        </div>

    </div>
  )
}

export default ImageInput