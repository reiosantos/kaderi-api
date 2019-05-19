
class Utils {
	static sortListOfObjects(list, firstAttribute) {
		list.sort((a, b) => {
			if (a[firstAttribute].toLowerCase() < b[firstAttribute].toLowerCase()) return -1;
			if (a[firstAttribute].toLowerCase() > b[firstAttribute].toLowerCase()) return 1;
			return 0;
		});
	}
}

export default Utils;
