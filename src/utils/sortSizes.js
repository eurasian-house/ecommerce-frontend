export const sortSizes = (sizes = []) => {

    const getWidth = (size = "") => {
        const match = size.match(/^(\d+(?:\.\d+)?)/);
        return match ? parseFloat(match[1]) : Number.MAX_VALUE;
    };

    const getHeight = (size = "") => {
        const match = size.match(/[x×]\s*(\d+(?:\.\d+)?)/i);
        return match ? parseFloat(match[1]) : Number.MAX_VALUE;
    };

    return [...sizes].sort((a, b) => {
        return (
            getWidth(a.size) - getWidth(b.size) ||
            getHeight(a.size) - getHeight(b.size)
        );
    });
};