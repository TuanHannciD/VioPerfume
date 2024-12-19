export const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black',
    borderRadius: '5px',
    padding: '5px 10px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#black',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#007bff' : 'white',
    color: state.isSelected ? 'white' : '#333',
    '&:hover': {
      backgroundColor: '#f0f0f0',
      color: '#007bff',
    },
  }),
}; 