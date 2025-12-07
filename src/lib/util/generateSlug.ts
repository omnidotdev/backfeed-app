const generateSlug = (name: string | undefined) => {
  if (!name) return undefined;

  const unaccentedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const replacedSpaces = unaccentedName.replace(/\s+/g, "-");
  const replacedMultipleDashes = replacedSpaces.replace(/-{2,}/g, "-");
  const removeSpecialCharacters = replacedMultipleDashes.replace(
    /[^a-zA-Z0-9 -]+/g,
    "",
  );
  const removeBeginningDashes = removeSpecialCharacters.replace(/^[-]+/, "");
  const removeEndingDashes = removeBeginningDashes.replace(/[-]+$/, "");

  return removeEndingDashes.toLowerCase();
};

export default generateSlug;
