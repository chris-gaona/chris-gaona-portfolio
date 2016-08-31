export default ngModule => {
  describe('mainCtrl', function () {
    beforeEach(window.module(ngModule.name));

    it('should test properly', function () {
      expect(false).to.be.true;
    });
  });
};
