/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return root;
    
    const tempLeft = root.left  
    root.left = root.right
    root.right = tempLeft
    
    invertTree(root.left)
    invertTree(root.right)
    
    return root
};

/**
 * Definition for Employee.
 * function Employee(id, importance, subordinates) {
 *     this.id = id;
 *     this.importance = importance;
 *     this.subordinates = subordinates;
 * }
 */

/**
 * @param {Employee[]} employees
 * @param {number} id
 * @return {number}
 */

const createEmployeeGraph = (employeeArray) => {
    let graph = {}

    employeeArray.forEach(emp => {
        graph[emp.id] = emp;
    });

    return graph;
}

var GetImportance = function (employees, id, graph) {
    if (!graph) graph = createEmployeeGraph(employees);

    let currentEmployee = graph[id];
    let sum = currentEmployee.importance;

    if (currentEmployee.subordinates) {
        currentEmployee.subordinates.forEach(empId => {
            sum += GetImportance(employees, empId, graph)
        });
    }

    return sum;
};