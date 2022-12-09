    const input = document.querySelector('pre').textContent.trim();
    let visibleTrees = 0;
    const makeNumberArray = (text) => {
        const chars = [...text];
        return chars.map(char => parseInt(char));
    }
    const prep = (text, emptyArr) => {
        const lines = text.split('\n');
        lines.forEach(line => {
            emptyArr.push(makeNumberArray(line));
        });
        return emptyArr;
    }

    const isVisibleLine = (line, height, index) => {
        if (index == 0 || index == line.length) {
            return true;
        }
        const before = line.slice(0, index);
        const after = line.slice(index + 1, line.length);
        if (Math.max(...before) < height || Math.max(...after) < height) {
            return true;
        }
        else {
            return false;
        }
    }
    const isVisibleY = (grid, height, xIndex, yIndex) => {
        // console.log('column');
        const column = grid.map(line => line[xIndex]);
        // console.log(column);
        return isVisibleLine(column, height, yIndex);
    }
    const treeGrid = prep(input, []);

    const findNearestTallBoy = (line, height) => {
        let distance = 0;
        if (line.length == 0) { return 1; }
        for (let i=0; i < line.length; i++) {
            distance++;
            if (line[i] >= height) {
                break;
            }
        }
        console.log(`Height: ${height}, Segment ${line}, Distance: ${distance}`);
        return distance;
    }

    treeGrid.forEach((line, yIndex) => {
        line.forEach((tree, xIndex) => {
            if (isVisibleY(treeGrid, tree, xIndex, yIndex) || isVisibleLine(line, tree, xIndex)) {
                visibleTrees += 1;
            }
        })
    })

    const getDistance = (line, index) => {
        const treeHeight = line[index];
        // console.log(treeHeight);
        const before = line.slice(0, index).reverse();
        // console.log(before);
        const after = line.slice(index + 1, line.length);
        // console.log(after);
        const beforeDist = findNearestTallBoy(before, treeHeight);
        const afterDist = findNearestTallBoy(after, treeHeight);
        if (beforeDist !== 0 && afterDist !== 0) {
            console.log(beforeDist * afterDist);
            return (beforeDist * afterDist);
        }
        else {
            console.log(Math.max(beforeDist, afterDist));
            return Math.max(beforeDist, afterDist);
        }

    }

    let maxDistance = 0;
    treeGrid.forEach((line, yIndex) => {
        line.forEach((tree, xIndex) => {
            const x = getDistance(line, xIndex);
            const column = treeGrid.map(treeline => treeline[xIndex]);
            const y = getDistance(column, yIndex);
            if (x == 0 || y == 0) {
                if (Math.max(y, x) > maxDistance) {
                    maxDistance = Math.max(x, y);
                }
            }
            if (x * y > maxDistance) {
                maxDistance = x * y;
            }
        })
    })

    console.log(visibleTrees);
    console.log(maxDistance);