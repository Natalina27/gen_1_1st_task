function order(cityNodes, cityFrom, cityTo, company) {
    const result = new Set();
    result.add(company);
    const roads = toRoads(cityFrom, cityTo);
    let neighbours = findCityNeighbours(company, roads);
    while (true) {
        const oldSize = result.size;
        neighbours.sort(numbersComparator).forEach((city) => result.add(city));
        if (oldSize === result.size) break;
        neighbours = neighbours.map((neighbour) => findCityNeighbours(neighbour, roads)).flat();
    }
    return [...result].slice(1);
}
function toRoads(fromCities, toCities) {
    const roads = [];
    for (let i = 0; i < Math.min(fromCities.length, toCities.length); i++) {
        const from = fromCities[i];
        const to = toCities[i];
        roads.push([from, to]);
    }

    return roads;
}

function findCityNeighbours(city, roads) {
    const neighbours = [];

    roads.forEach((road) => {
        if (road[0] === city) {
            neighbours.push(road[1]);
        } else if (road[1] === city) {
            neighbours.push(road[0]);
            neighbours.push(road[0]);
        }
    });
    return neighbours;
}
function numbersComparator(num1, num2) {return num1 - num2}

console.log(order(4, [1,2,2], [2,3,4], 1));//[2,3,4]
console.log(order(5, [1,1,2,3,1], [2,3,4,5,5], 1));//[2,3,5,4]
console.log(order(3, [1,2], [2], 2));//[1]