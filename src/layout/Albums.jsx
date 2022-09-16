import { useContext } from 'react'
import { DataContext } from '../App'

import AlbumCover from '../components/AlbumCover'

export default function Albums() {

    const dataContext = useContext(DataContext);
    const { albumData, handleAddAlbumForm, updateAlbumForm, 
        mode, handleAddNewAlbum, handleAlbumsMode } = dataContext || {};
    // console.log(albumData)

    const numOfAlbums = albumData.albums.length;
    
    const albumCovers = albumData.albums.map((album, index) => {
        // console.log(album.data);
        // console.log("-------")
        const name = album.name;
        const route = album.route;
        const length = album.data.length;
        const data = album.data;
        let url;
        console.log(length);
        if (length === 0) {
            url = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
        } else {
            url = album.data?.[0].url;
        }               
        
        return(
            <AlbumCover
                name={name}
                route={route} 
                data={data}
                url={url}
                length={length}
                handleAlbumsMode={handleAlbumsMode}
                key={index}
            />
        )
    })

    return(
        <>
        <div className="flex mt-16">
            
            {
            mode.isAddingAlbum ? 
            <form>
                <input 
                    type="text" 
                    onChange={updateAlbumForm} value={albumData.form} 
                    placeholder="album name"
                    className="input input-bordered w-full max-w-xs"
                />
                <button className="btn" onClick={handleAddNewAlbum}>Add</button>
            </form> :
            <button className="btn" onClick={handleAddAlbumForm}>New album</button>
            }
      
        </div>
        {numOfAlbums === 0 && 
            <div className="mt-16">
                <span className="text-lg">You have no albums</span>
            </div>         
        }
        <div className='grid grid-cols-3 gap-4 justify-center mt-16'>
        {albumCovers}
        </div>
        
        </>
    )
}