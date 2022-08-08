document.getElementById("body")!.innerHTML = `
<div class="container">
        <div class="navigation">
            <button class="nav_buttons" id="garage">Garage</button>
            <button class="nav_buttons" id="winners">Winners</button>
        </div>
        <div class="garage-container">
            <div class="customization">
                <input type="text" name="" id="car-create-name">
                <input type="color" name="" id="car-create-color" value="#4ea1c4">
                <button class="button" id="create">Create</button>
                <input type="text" name="" id="car-edit-name">
                <input type="color" name="" id="car-edit-color" value="#ff0000">
                <button class="button" id="update">Update</button>
            </div>
            <div class="controls">
                <button id="race">Race</button>
                <button id="reset">Reset</button>
                <button id="generate">Generate cars</button>
            </div>
            <div class="garage">
                <h2>Garage (<span id="garage-counter">0</span>)</h2>
                <h3>Page #<span id="page-counter">1</span></h3>
                <div id="garage-wrapper">
                    <!-- cars will be here -->
                </div>
            </div>
            <div class="controls">
                <button id="prev_page">Previous</button>
                <button id="next_page">Next</button>
            </div>
        </div>
    </div>
`