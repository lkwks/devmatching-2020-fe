export default class DarkMode
{
    constructor($target)
    {
        this.$isDarkMode = $target.querySelector("#isDarkMode");
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            this.$isDarkMode.setAttribute("checked", "checked");
            document.documentElement.classList.toggle("dark");
        }
        else
            document.documentElement.classList.toggle("light");

        this.$isDarkMode.addEventListener("click", _=> 
        {
            document.documentElement.classList.toggle("light");
            document.documentElement.classList.toggle("dark");
        });
    }
}
