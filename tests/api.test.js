// Déscribe nous permet de définir un chapitre de tests
describe('Sample Test', () => {
  // it nous permet de décrire un test
  it('should test that true === true', () => {
    // On met en place une assertion avec expect
    // https://jestjs.io/fr/docs/expect
    expect(true).toBe(true);
  });
});