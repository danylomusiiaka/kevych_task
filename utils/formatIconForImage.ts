export const formatIconForImage = (icon: string) => {
    const formatedIcon = icon.endsWith("n") ? icon.slice(0, -1) + "d" : icon;
    return `https://openweathermap.org/img/wn/${formatedIcon}@2x.png`;
}