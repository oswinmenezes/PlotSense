export default function Footer(){
    const d= new Date();
    const year=d.getFullYear();
    return <footer>Copyright © {year} Smart Parking. All Rights Reserved.</footer>
}