const calculateTip=require('../playGround/claculateTip');
test('clacTip', () => {
    expect(calculateTip(10, .3)).toBe(13);
})
