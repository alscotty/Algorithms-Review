/*
Given the following schema for a hypothetical university:

students
+------------+------+
| student_id | INT  |
| name       | TEXT |
+------------+------+

teachers
+------------+------+
| teacher_id | INT  |
| name       | TEXT |
+------------+------+

courses
+-----------+------+
| course_id | INT  |
| name      | TEXT |
+-----------+------+

student_courses
+------------+-----+
| student_id | INT |
| course_id  | INT |
+------------+-----+

teacher_courses
+------------+-----+
| teacher_id | INT |
| course_id  | INT |
+------------+-----+

Write queries that will answer the following questions:

1) How many students belong to each teacher?
2) Which teacher is teaching the most courses?
3) What courses have no students?
*/

-- 1)
with grouped_by_teacher_id as (
SELECT
teachers.teacher_id,
COUNT( distinct students.name) as total_students_per_teacher
FROM teachers
join teacher_courses ON teachers.teacher_id = teacher_courses.teacher_id
join student_courses on student_courses.course_id = teacher_courses.course_id
join students on student_courses.student_id = students.student_id
group by teachers.teacher_id

)

Select
teachers.name,
total_students_per_teacher
from teachers
join grouped_by_teacher_id on grouped_by_teacher_id.teacher_id = teachers.teacher_id

## Running React on CoderPad

This pad is running a React app that is served by Vite.  Changes are automatically captured as you type them, and other people in the Pad can see them.  You can add as many files to the project as you need, as well as any NPM packages.

To get started, edit the `App.tsx` file, and see your changes reload on the right.

### TypeScript

The app is pre-configured to support TypeScript, but you can define .js and .jsx files instead.

### IntelliSense

IntelliSense is running across your entire project, allowing you to see when there are syntax errors or to get quick hints for how to resolve errors or TypeScript issues.

### Shell

A shell is provided to you so you can inspect your container in more detail.  The shell can be used to install NPM packages using `npm install <package>`.  In addition to installing packages, the shell can be used for executing a test suite if you have one defined.

**Note: while it's possible to edit files directly from the shell, we recommend using the editor to make your changes.  That way, other people in the Pad can see your changes as they're being made.**

### Hot Module Reloading

Vite provides Hot Module Reloading by default, meaning that changes you make to the files in your project are automatically applied (after a 2 second debounce); there is no need to refresh the iframe to see the changes.  Vite will display any errors directly in the application output, or if there is a system-wide error, in the Logs.

Note that changes to certain files (index.html, vite.config.ts, and others) will cause the entire application to reload, while changes to other files (App.tsx) will not cause an app reload. The state of the application will be reset whenever the application reloads.

### About Vite

We chose [Vite](https://vitejs.dev) because of its [fast startup times](​​https://vitejs.dev/guide/why.html#slow-server-start) and [quick browser updates](https://vitejs.dev/guide/why.html#slow-updates) using native ES Modules.  You probably won't need to change any of the [Vite configuration options](https://vitejs.dev/config/), but if you do, you can edit the `vite.config.ts` file.

### Container Limits

The container running your application has a few limitations.  Currently, we don't limit your CPU usage, though this may change in future.  In addition to CPU, we monitor the network bandwidth that is consumed, and limit you to 75mb for the duration of the container.  Finally, we limit the amount of memory accessible to each container to 2 GB.

### Assets

Out-of-the-box support for SVG files is included, just add a `whatever.svg` file and then import it wherever you need it.  Other assets will need to be hosted elsewhere and fetched via the shell, or just referenced directly in HTML tags.



const _ = require('lodash');

// Function to find the buildings with an ocean view
// [buildings] --> X ocean location
function findOceanViewBuildings(heights) {
  let currentHighestBuilding = 0;
  let reversedHeights = heights;
  let oceanViewIndices = [];

  for (let i=reversedHeights.length; i >= 0; i--) {
    let currentBuildingHeight = reversedHeights[i];

    if (currentBuildingHeight > currentHighestBuilding) {
      oceanViewIndices.push(i);
      currentHighestBuilding = currentBuildingHeight;
    }

  }

  return oceanViewIndices.reverse();
}

// Driver code
function main() {
  console.log("add some test cases here")

  let testCase1 = findOceanViewBuildings([4,2,3,1] )
  console.log(`Expect ${testCase1} to be  [0,2,3] `)
 
  let testCase2 = findOceanViewBuildings( [1,3,2,4]  )
  console.log(`Expect ${testCase2} to be  [3] `)


}

// Invoke the main function
main();
