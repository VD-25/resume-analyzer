// FilterCheckboxsList.js
import React from "react";
import FilterCheckbox from "./FilterCheckbox";

function FilterCheckboxsList({ filters, selectedFilters, onFilterChange }) {
    return (
        <div className="filter-checkboxes-list">
            {filters.map((filter) => (
                <FilterCheckbox
                    key={filter.value}
                    label={filter.label}
                    value={filter.value}
                    checked={selectedFilters.includes(filter.value)}
                    onChange={(e) => onFilterChange(filter.value, e.target.checked)}
                />
            ))}
        </div>
    );
}

export default FilterCheckboxsList;
