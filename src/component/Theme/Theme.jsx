import styles from "./Theme.module.css";


export function Theme() {
    
    function handleValueChange() {

    }
    
    
    return (
        <div>
        <span>Theme</span>
        <select defaultValue="Light dark" onChange={handleValueChange}>
        <option value="light dark">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        </select>
        </div>
    );
}