const sameAs = (compare) => (value) => value === compare;

const afterTime = (compare) => (value) => {
    return new Date(value) > new Date(compare);
}

export { sameAs, afterTime };
