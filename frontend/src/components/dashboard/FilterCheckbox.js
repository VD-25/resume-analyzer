import React from "react";
import "../../styles/FilterCheckbox.css";

function FilterCheckbox({ label, value, checked, onChange }) {
    return (
        <label className="filter-checkbox">
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {label}
        </label>
    );
}

export default FilterCheckbox;
