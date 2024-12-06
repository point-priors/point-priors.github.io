window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    // var coll = document.getElementsByClassName("collapsible");
    // var i;

    // for (i = 0; i < coll.length; i++) {
    //   coll[i].addEventListener("click", function() {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.visibility === "visible") {
    //       content.style.visibility = "hidden";
    //     } else {
    //       content.style.visibility = "visible";
    //     }
    //   });
    // }

    const taskSelect = document.getElementById('taskSelect');
    const generalizationSelect = document.getElementById('generalizationSelect');
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.getElementById('results-carousel');

    let index = 0;

    // Videos database (you can add more here)
    // Generalization options based on task selection
    const generalizationData = {
      "task1": [
          { value: "generalization1", text: "Spatial Generalization" },
          { value: "generalization2", text: "Novel Objects" },
          { value: "generalization3", text: "Distractors" }
      ],
      "task2": [
        { value: "generalization1", text: "Spatial Generalization" },
        { value: "generalization2", text: "Novel Objects" }
      ],
      "task3": [
        { value: "generalization1", text: "Spatial Generalization" },
          { value: "generalization2", text: "Novel Objects" },
          { value: "generalization3", text: "Distractors" }
      ]
    };

    // Function to update the second dropdown based on the first dropdown's value
    function updateGeneralizationOptions(task) {
        // Clear the current options in the generalization select
        generalizationSelect.innerHTML = '';

        if (task in generalizationData) {
            // Populate the generalization dropdown with new options
            generalizationData[task].forEach(option => {
                const newOption = document.createElement('option');
                newOption.value = option.value;
                newOption.text = option.text;
                generalizationSelect.appendChild(newOption);
            });
        }
    };

    // Listen for changes in the task dropdown and update the generalization dropdown
    taskSelect.addEventListener('change', (event) => {
      const selectedTask = event.target.value;
      updateGeneralizationOptions(selectedTask);
    });

    const videoData = {
    "task1": {
            "generalization1": [
                {src: "./static/videos/pick/original/Original_1_Compressed.mp4", id: "item-cup1-1"},
                {src: "./static/videos/pick/original/Original_4_Compressed.mp4", id: "item-cup1-4"},
                {src: "./static/videos/pick/original/Original_7_Compressed.mp4", id: "item-cup1-7"},
                {src: "./static/videos/pick/original/Original_10_Compressed.mp4", id: "item-cup1-10"},

            ],
            "generalization2": [
              {src: "./static/videos/pick/novel/New_1_Compressed.mp4", id: "item-cup1-1"},
              {src: "./static/videos/pick/novel/New_4_Compressed.mp4", id: "item-cup1-4"},
              {src: "./static/videos/pick/novel/New_7_Compressed.mp4", id: "item-cup1-7"},
            ],

            "generalization3": [
              {src: "./static/videos/pick/distracting/Distracting_1_Compressed.mp4", id: "item-cup1-1"},
              {src: "./static/videos/pick/distracting/Distracting_3_Compressed.mp4", id: "item-cup1-4"},
            ]
        },
      'task2': {
        "generalization1": [
                {src: "./static/videos/put_mug_on_plate/original/Original_1_Compressed.mp4", id: "item-cup1-1"},
                {src: "./static/videos/put_mug_on_plate/original/Original_2_Compressed.mp4", id: "item-cup1-4"},
                {src: "./static/videos/put_mug_on_plate/original/Original_3_Compressed.mp4", id: "item-cup1-7"},
                {src: "./static/videos/put_mug_on_plate/original/Original_4_Compressed.mp4", id: "item-cup1-10"},

            ],
            "generalization2": [
              {src: "./static/videos/put_mug_on_plate/novel/New_1_Compressed.mp4", id: "item-cup1-1"},
              {src: "./static/videos/put_mug_on_plate/novel/New_2_Compressed.mp4", id: "item-cup1-4"},
            ],
      },
      'task3': {
          "generalization1": [
                {src: "./static/videos/lift_plate/original/Original1_compressed.mov", id: "item-cup1-1"},
                {src: "./static/videos/lift_plate/original/Original2_compressed.mov", id: "item-cup1-4"},
                {src: "./static/videos/lift_plate/original/Original3_compressed.mov", id: "item-cup1-7"},

            ],
            "generalization2": [
              {src: "./static/videos/lift_plate/novel/Novel1_compressed.mov", id: "item-cup1-1"},
              {src: "./static/videos/lift_plate/novel/Novel2_compressed.mov", id: "item-cup1-4"},
            ],

            "generalization3": [
              {src: "./static/videos/lift_plate/distracting/Distractor1_compressed.mov", id: "item-cup1-1"},
              {src: "./static/videos/lift_plate/distracting/Distractor2_compressed.mov", id: "item-cup1-4"},
            ]
      }
    };

    function loadVideos(task, generalization) {
        carouselContainer.innerHTML = ''; // Clear the carousel
        const carousel = document.createElement('div');
        carousel.classList.add('carousel', 'results-carousel');
        carousel.id = 'results-carousel';
        const videos = videoData[task][generalization];
        videos.forEach(video => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item', video.id);

            const videoElement = document.createElement('video');
            videoElement.controls = true;
            videoElement.muted = true;
            videoElement.loop = true;
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.id = video.id;  // Set the unique ID for the video element
            videoElement.height = '100px';
            
            const sourceElement = document.createElement('source');
            sourceElement.setAttribute('src', video.src);
            sourceElement.setAttribute('type', 'video/mp4');

            videoElement.appendChild(sourceElement);
            itemDiv.appendChild(videoElement);
            carousel.appendChild(itemDiv);
        });
        carouselContainer.appendChild(carousel);

        // carouselContainer.style.display = 'block'; // Show the carousel
        updateCarousel(); // Ensure proper alignment
    }

    function updateVideo() {
        const taskValue = taskSelect.value;
        const generalizationValue = generalizationSelect.value;

        if (taskValue && generalizationValue) {
            loadVideos(taskValue, generalizationValue);
        }
    }

    function updateCarousel() {
        const width = document.querySelector('.item').clientWidth;

        // bulmaCarousel.removeAll(); // Remove all carousels
        // // Initialize all div with carousel class
        var carousels = bulmaCarousel.attach('.carousel', options);

        // Loop on each carousel initialized
        for(var i = 0; i < carousels.length; i++) {
          // Add listener to  event
          carousels[i].on('before:show', state => {
            console.log(state);
          });
        }

        // Access to bulmaCarousel instance of an element
        var element = document.querySelector('#my-element');
        if (element && element.bulmaCarousel) {
          // bulmaCarousel instance is available as element.bulmaCarousel
          element.bulmaCarousel.on('before-show', function(state) {
            console.log(state);
          });
        }

        // carousel.style.transform = `translateX(${-index * width}px)`;
    }

    // Event listeners
    taskSelect.addEventListener('change', updateVideo);
    generalizationSelect.addEventListener('change', updateVideo);

    // Adjust carousel on window resize
    window.addEventListener('resize', updateCarousel);

})
