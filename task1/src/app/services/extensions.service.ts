export class Extensions {
    filterId(item, data) {
        let result: number;
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id == item._id) result = i;
        }
        return result;
    }
} 