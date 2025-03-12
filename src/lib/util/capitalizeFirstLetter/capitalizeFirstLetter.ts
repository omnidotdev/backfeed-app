const capitalizeFirstLetter = (str: string | undefined) =>
  str ? str?.charAt(0).toUpperCase() + str?.slice(1) : undefined;

export default capitalizeFirstLetter;
