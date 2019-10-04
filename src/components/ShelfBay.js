import React from 'react';
// import {Palette} from 'react-palette'
import ImagePalette from 'react-image-palette'


// TODO:
// Replace local variables with incoming props.
// Will need:
// - Dimensions of the individual shelf (w, h)
// - An array of games to put on that shelf (name, x, y, z, color)
// const determineBoxColour = (imgURL) => {
//   let v = new Vibrant(imgURL)
//   v.getPalette().then((palette) => palette.Vibrant.rgb)
// }
const corsUrl = "https://cors-anywhere.herokuapp.com/"; //Used to allow cross-origin requests. Try and replace this with something sustainable in the future. 


const ShelfBay = (props) => {
  const shelfDimensions = {
    "w" : props.individualShelfArea.individualShelfWidth,
    "h" : props.individualShelfArea.individualShelfHeight,
  }

  const gameBoxList = props.gamesToAddToShelf;

  const builtShelfList = gameBoxList.map((game, i) => {

    //TODO: This code is DEFINITELY not DRY
    const dims = {
      "x" : game.size_width,
      "y" : game.size_height,
      "z" : game.size_depth,
      "units" : game.size_units,
    }

    if (dims.units.trim() == "inches"){
      dims.x = parseFloat(dims.x).toFixed(2) * 25.4;
      dims.y = parseFloat(dims.y).toFixed(2) * 25.4;
      dims.z = parseFloat(dims.z).toFixed(2) * 25.4;
      dims.units = "mm";
    }

    const sortedShapeArray = [dims.x, dims.y, dims.z].sort((a, b) => a - b);

    let idKey = `${game.id}${i}`;
    console.log(idKey)
    const defaultPalette = {
      backgroundColor: "hsl(204, 86%, 53%)",
      color: "#fff",
      alternativeColor: "hsl(171, 100%, 41%)",
    }

    return (// TODO: handle image loading before executing palette
      // I'm certainly not doing the styles right either
      <ImagePalette image={corsUrl + game.image_url} crossOrigin defaults={defaultPalette}>
        {({ backgroundColor, color, alternativeColor }) => (
            <li key={idKey} className="individual-board-game-box" style={{ width: sortedShapeArray[0], height: sortedShapeArray[1], background: backgroundColor, borderWidth: "1px", borderStyle: "solid", borderColor: alternativeColor}}><span style={{color: color}} className="gameBoxName title is-4">{game.name}</span>
            </li> 
        )}
      </ImagePalette>
    )
  });

  const shelfstyleset = {
    display: "flex",
    width: `${shelfDimensions.w}px`,
    height: `${shelfDimensions.h}px`,
    flexWrap: "wrap-reverse",
    // flexWrap: "nowrap",
    alignContent: "flex-start",
    alignItems: "flex-start",
    background: "LightGrey"
  }

  return (
    <ul style={shelfstyleset}>
      {builtShelfList}
    </ul>
  )
}

export default ShelfBay;