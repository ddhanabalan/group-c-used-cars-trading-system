export default function Results() {
    return (
        <div className="m-64 relative min-h-[50px]">
            <input id="fromSlider" type="range" value="10" min="0" max="100"/>
            <input id="toSlider" type="range" value="40" min="0" max="100"/>
        </div>
    )
}