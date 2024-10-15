export default function floorToTwoDecimal(num) {
    return (Math.floor(Number(num) * 100) / 100) || "Nothing";
}