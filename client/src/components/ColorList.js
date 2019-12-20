import React, { useState } from "react";
import axiosWithAuth from "../axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorForm, setColorForm] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setEditing(false);
        getColors();
      })
      .catch(err => {
        debugger
        console.error(err.message)
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => (updateColors(colors.filter(c => c.id !== color.id))))
      .catch(err => (console.error(err.message)))
  };

  const newColorChange = color => {
    setColorForm(color)
  }

  const addColor = evt => {
    evt.preventDefault();

    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, colorForm)
      .then(res => {
        getColors();
      })
      .catch(err => (console.error(err.message)))
    setColorForm(initialColor);
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <label>
          Color Name:
          <input
            type="text"
            name="color"
            value={colorForm.color}
            onChange={evt => newColorChange({ ...colorForm, color: evt.target.value })} />
        </label>
        <label>
          Hex Code:
          <input
            type="text"
            name="hex"
            value={colorForm.code.hex}
            onChange={evt => newColorChange({ ...colorForm, code: { hex: evt.target.value } })}
          />
        </label>
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
