const {getInitials} = require('./utils');

describe("Making Initials", () => {
    it('from common name', () => {expect(getInitials("Dale Cooper")).toBe('DC')});
    it('from multiple words name (takes first and last word)', () => {expect(getInitials("Franklin Delano Roosevelt")).toBe('FR')});
    it('from single word name', () => {expect(getInitials("Madonna")).toBe('M')});
    it('from empty name', () => {expect(getInitials("")).toBe('')});
    it('from whitespace name', () => {expect(getInitials("      \n \t")).toBe('')});
    it('from name surrounded by white space', () => {expect(getInitials("      \n Dale Cooper \t")).toBe('DC')});
    it('from name with lowercases', () => {expect(getInitials("harry s. trueman")).toBe('HT')});
    it('from null name', () => {expect(getInitials(null)).toBe('')});
    it('from undefined name', () => {expect(getInitials(undefined)).toBe('')});
});
