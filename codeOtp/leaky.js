function leakyTimer() {
    let counter = 0;
    const interval = setInterval(() => {
        counter++;
        console.log(`Counter: ${counter}`);

        if (counter > 10) {
            console.log("Timer stopped!");
            clearInterval(interval); // Stop the interval
        }
    }, 1000);
}

leakyTimer();