import {useEffect} from 'react'
function FetchBlob() {
    useEffect(() => {
        async function getBlobImage(){
            const response = await fetch('https://res.cloudinary.com/dghu2ne82/image/upload/1a191d90-8269-433e-a0a7-340948c2b4b9_coffee-5037804_640.jpg');
            const blob = await response.blob();
            console.log(blob)
        }
        getBlobImage()
    }, [])
    
    return (
      <div>
            <img src="https://res.cloudinary.com/dghu2ne82/image/upload/1a191d90-8269-433e-a0a7-340948c2b4b9_coffee-5037804_640.jpg" alt="phot" />
      </div>
    )
}

export default FetchBlob;