export async function stepValidationSecondEdition() {
  const isAsync = Math.random() > 0.5;
  const isValid = Math.random() > 0.5;

  if (isAsync) {
    return new Promise<boolean>((resolve) => {
      resolve(isValid);
    });
  }

  return isValid;
}