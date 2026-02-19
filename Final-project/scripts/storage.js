export function saveFilter(value) {
    localStorage.setItem("selectedDistrict", value);
  }
  
  export function getFilter() {
    return localStorage.getItem("selectedDistrict");
  }
  