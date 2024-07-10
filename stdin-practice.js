// stdin (standard in) => terminal (the standard way an application recieves informaion)

//STDIN ALLOWS USER TO INPUT TEXT AND WILL SUBMIT IT EVERY TIME THEY PRESS ENTER.

process.stdin.setEncoding('utf8')

process.stdin.on('data', (data) => {
  console.log('you typed: ', data)
})

// stdout (standard out) => console.log is like saying take this string and standard out it to the terminal.
