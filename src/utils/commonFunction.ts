

export const isOneOf = (value: string, ...args: string[]): boolean => {
    return args.filter(x => x === value).length > 0;
}