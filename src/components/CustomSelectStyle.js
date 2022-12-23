export const CustomStyle = {
//   container: (provided) => ({
//     ...provided,
//     background: 'none',
//   }),
//   input: (provided) => ({
//     ...provided,
//     background: 'none',
//   }),
//
  singleValue: (provided) => ({
    ...provided,
    background: 'none',
    color: 'inherit',
  }),
  //   groupHeading: (provided) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //   group: (provided) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //   clearIndicator: (provided) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  //   indicatorsContainer: (provided) => ({
  //     ...provided,
  //     background: 'none',
  //   }),
  menu: (provided) => ({
    ...provided,
    background: 'none',
  }),
  menuList: (provided) => ({
    ...provided,
    background: 'rgba(142, 142, 142, 0.95)',
  }),
  menuPortal: (provided) => ({
    ...provided,
    background: 'none',
  }),
  option: (provided) => ({
    ...provided,
    background: 'none',
  }),
  valueContainer: (provided) => ({
    ...provided,
    background: 'transparent',
  }),
  control: (provided, state) => ({
    ...provided,
    background: 'transparent',
    opacity: `${state.isDisabled ? '0.5' : '1'}`,
    cursor: `${state.isDisabled ? 'not-allowed' : 'default'}`,
  }),
  multiValue: (provided) => ({
    ...provided,
    background: 'unset',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'inherit',
  }),
};
