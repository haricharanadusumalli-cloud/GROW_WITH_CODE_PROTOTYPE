import {
  Course,
  Module,
  Topic,
  Lesson,
  Problem,
  Assessment,
  CertificateData,
  ArenaChallenge,
  InterviewReportData,
  UserState,
} from '../types';

export const COURSES: Course[] = [
  {
    id: 'course-python',
    slug: 'python',
    title: 'Python Programming',
    tagline: 'Learn Python from fundamentals to interview-ready programming.',
    description: 'Master core syntax, data structures, algorithmic thinking, and object-oriented design with interview-grade practice problems.',
    difficulty: 'Beginner → Advanced',
    totalModules: 6,
    totalTopics: 10,
    totalProblems: 50,
    estimatedHours: 36,
    iconName: 'Code2',
    color: '#10b981', // emerald
    isPopular: true,
  },
  {
    id: 'course-sql',
    slug: 'sql',
    title: 'SQL & Database Design',
    tagline: 'Write complex queries, joins, window functions, and schema models.',
    description: 'From simple SELECT statements to multi-table joins, aggregations, CTEs, indexes, and relational database normalization.',
    difficulty: 'Beginner → Advanced',
    totalModules: 5,
    totalTopics: 9,
    totalProblems: 45,
    estimatedHours: 28,
    iconName: 'Database',
    color: '#0ea5e9', // sky
    isPopular: true,
  },
  {
    id: 'course-java',
    slug: 'java',
    title: 'Java & Object-Oriented Design',
    tagline: 'Enterprise-grade Java, memory model, collections, and OOP patterns.',
    description: 'Comprehensive Java covering type systems, JVM internals, collections framework, inheritance, polymorphism, and DSA.',
    difficulty: 'Beginner → Advanced',
    totalModules: 7,
    totalTopics: 12,
    totalProblems: 60,
    estimatedHours: 42,
    iconName: 'Coffee',
    color: '#f59e0b', // amber
  },
  {
    id: 'course-c',
    slug: 'c',
    title: 'C Programming & Systems',
    tagline: 'Pointers, manual memory management, bitwise operations, and low-level control.',
    description: 'Understand how computers really work. Master pointers, stack vs heap allocation, structs, system calls, and performance optimization.',
    difficulty: 'Beginner → Advanced',
    totalModules: 6,
    totalTopics: 10,
    totalProblems: 50,
    estimatedHours: 34,
    iconName: 'Cpu',
    color: '#8b5cf6', // purple
  },
  {
    id: 'course-html',
    slug: 'html',
    title: 'HTML & Semantic Web Architecture',
    tagline: 'Accessible markup, semantic layout, SEO best practices, and document tree.',
    description: 'Structure modern web applications with semantic tags, web accessibility (a11y), forms, media, and search engine architecture.',
    difficulty: 'Beginner → Intermediate',
    totalModules: 4,
    totalTopics: 8,
    totalProblems: 35,
    estimatedHours: 18,
    iconName: 'Layout',
    color: '#f97316', // orange
  },
  {
    id: 'course-css',
    slug: 'css',
    title: 'Modern CSS & Responsive Systems',
    tagline: 'Flexbox, Grid, container queries, custom properties, and UI performance.',
    description: 'Build responsive, fluid user interfaces without framework crutches. Master the box model, specificity, cascade, and CSS Grid layouts.',
    difficulty: 'Beginner → Advanced',
    totalModules: 5,
    totalTopics: 9,
    totalProblems: 40,
    estimatedHours: 24,
    iconName: 'Palette',
    color: '#3b82f6', // blue
  },
];

export const PYTHON_MODULES: Module[] = [
  {
    id: 'mod-1',
    courseId: 'course-python',
    order: 1,
    title: 'Module 1: Language Fundamentals',
    description: 'Environment setup, basic syntax, primitive data types, and operators.',
    topicIds: ['topic-py-fundamentals', 'topic-py-variables', 'topic-py-operators', 'topic-py-conditionals'],
  },
  {
    id: 'mod-2',
    courseId: 'course-python',
    order: 2,
    title: 'Module 2: Control Flow & Iteration',
    description: 'Mastering iteration mechanics, loops, and loop control statements.',
    topicIds: ['topic-py-loops'],
  },
  {
    id: 'mod-3',
    courseId: 'course-python',
    order: 3,
    title: 'Module 3: Modular Code & Functions',
    description: 'Function signatures, scope, recursion, lambdas, and closures.',
    topicIds: ['topic-py-functions'],
  },
  {
    id: 'mod-4',
    courseId: 'course-python',
    order: 4,
    title: 'Module 4: Core Data Structures',
    description: 'Memory layouts, time complexities, lists, tuples, dictionaries, and sets.',
    topicIds: ['topic-py-lists', 'topic-py-dictionaries'],
  },
  {
    id: 'mod-5',
    courseId: 'course-python',
    order: 5,
    title: 'Module 5: Object-Oriented Architecture',
    description: 'Classes, dunder methods, encapsulation, inheritance, and clean design patterns.',
    topicIds: ['topic-py-oop'],
  },
  {
    id: 'mod-6',
    courseId: 'course-python',
    order: 6,
    title: 'Module 6: Interview Algorithmic Patterns',
    description: 'Two pointers, sliding window, prefix sums, and space-time optimization in Python.',
    topicIds: ['topic-py-advanced'],
  },
];

export const PYTHON_TOPICS: Topic[] = [
  {
    id: 'topic-py-fundamentals',
    courseId: 'course-python',
    moduleId: 'mod-1',
    order: 1,
    title: 'Python Fundamentals',
    status: 'completed',
    estimatedMinutes: 30,
    difficulty: 'Easy',
    prerequisites: ['None'],
    learningObjectives: ['Understand Python execution model', 'Learn print statements and comment syntax', 'Understand indentation rules'],
    overview: 'An introduction to Python runtime, execution model, and core formatting conventions.',
    videoPreviewDuration: '10:45',
    lessonId: 'lesson-py-fundamentals',
    problemIds: ['prob-fund-1', 'prob-fund-2', 'prob-fund-3', 'prob-fund-4', 'prob-fund-5'],
  },
  {
    id: 'topic-py-variables',
    courseId: 'course-python',
    moduleId: 'mod-1',
    order: 2,
    title: 'Variables & Data Types',
    status: 'completed',
    estimatedMinutes: 40,
    difficulty: 'Easy',
    prerequisites: ['Python Fundamentals'],
    learningObjectives: ['Dynamic typing mechanics', 'Integers, floats, booleans, strings', 'Type casting and type inspections'],
    overview: 'Deep dive into Python primitive data types, memory references, and explicit type conversion.',
    videoPreviewDuration: '14:20',
    lessonId: 'lesson-py-variables',
    problemIds: ['prob-var-1', 'prob-var-2', 'prob-var-3', 'prob-var-4', 'prob-var-5'],
  },
  {
    id: 'topic-py-operators',
    courseId: 'course-python',
    moduleId: 'mod-1',
    order: 3,
    title: 'Operators & Expressions',
    status: 'completed',
    estimatedMinutes: 35,
    difficulty: 'Easy',
    prerequisites: ['Variables & Data Types'],
    learningObjectives: ['Arithmetic, comparison, logical, and bitwise operators', 'Operator precedence and associativity', 'Short-circuit evaluation'],
    overview: 'Explore mathematical, boolean, and bitwise expressions with operator evaluation order.',
    videoPreviewDuration: '12:15',
    lessonId: 'lesson-py-operators',
    problemIds: ['prob-op-1', 'prob-op-2', 'prob-op-3', 'prob-op-4', 'prob-op-5'],
  },
  {
    id: 'topic-py-conditionals',
    courseId: 'course-python',
    moduleId: 'mod-1',
    order: 4,
    title: 'Conditionals & Branching',
    status: 'completed',
    estimatedMinutes: 45,
    difficulty: 'Easy',
    prerequisites: ['Operators & Expressions'],
    learningObjectives: ['if, elif, else structure', 'Nested conditions and guard clauses', 'Ternary expressions and truthy/falsy evaluation'],
    overview: 'Controlling program flow through branching logic, guard clauses, and truth-value testing.',
    videoPreviewDuration: '15:10',
    lessonId: 'lesson-py-conditionals',
    problemIds: ['prob-cond-1', 'prob-cond-2', 'prob-cond-3', 'prob-cond-4', 'prob-cond-5'],
  },
  {
    id: 'topic-py-loops',
    courseId: 'course-python',
    moduleId: 'mod-2',
    order: 5,
    title: 'Loops & Iteration',
    status: 'current',
    estimatedMinutes: 50,
    difficulty: 'Medium',
    prerequisites: ['Conditionals & Branching'],
    learningObjectives: [
      'Master for loop syntax with range() and iterable sequences',
      'Understand while loops and termination invariants',
      'Use break, continue, and loop-else clauses correctly',
      'Analyze loop time complexity (O(N), O(N^2))',
    ],
    overview: 'Explore the mechanics of iteration in Python. Learn when to employ definite vs indefinite loops, avoid infinite loop traps, and generate complex output patterns.',
    videoPreviewDuration: '18:32',
    lessonId: 'lesson-py-loops',
    problemIds: ['prob-loop-1', 'prob-loop-2', 'prob-loop-3', 'prob-loop-4', 'prob-loop-5'],
  },
  {
    id: 'topic-py-functions',
    courseId: 'course-python',
    moduleId: 'mod-3',
    order: 6,
    title: 'Functions & Scope',
    status: 'locked',
    estimatedMinutes: 55,
    difficulty: 'Medium',
    prerequisites: ['Loops & Iteration'],
    learningObjectives: ['Define reusable procedures with def and return', 'Positional, keyword, *args, and **kwargs parameters', 'LEGB scope rules'],
    overview: 'Building modular, testable software using functions, parameter defaults, and scope discipline.',
    videoPreviewDuration: '21:00',
    lessonId: 'lesson-py-functions',
    problemIds: ['prob-fn-1', 'prob-fn-2', 'prob-fn-3', 'prob-fn-4', 'prob-fn-5'],
  },
  {
    id: 'topic-py-lists',
    courseId: 'course-python',
    moduleId: 'mod-4',
    order: 7,
    title: 'Lists, Tuples & Slicing',
    status: 'locked',
    estimatedMinutes: 60,
    difficulty: 'Medium',
    prerequisites: ['Functions & Scope'],
    learningObjectives: ['Dynamic array memory growth in CPython', 'List comprehension idiomatic patterns', 'Tuple immutability and packing/unpacking'],
    overview: 'Sequential collections, index arithmetic, multidimensional matrices, and slice notations.',
    videoPreviewDuration: '24:15',
    lessonId: 'lesson-py-lists',
    problemIds: ['prob-list-1', 'prob-list-2', 'prob-list-3', 'prob-list-4', 'prob-list-5'],
  },
  {
    id: 'topic-py-dictionaries',
    courseId: 'course-python',
    moduleId: 'mod-4',
    order: 8,
    title: 'Dictionaries & Hash Tables',
    status: 'locked',
    estimatedMinutes: 60,
    difficulty: 'Hard',
    prerequisites: ['Lists, Tuples & Slicing'],
    learningObjectives: ['Hash map internal architecture and hash collisions', 'O(1) average lookup vs worst-case degradation', 'dict methods and set operations'],
    overview: 'Key-value data architecture, hashing functions, dictionary comprehensions, and set theory.',
    videoPreviewDuration: '22:40',
    lessonId: 'lesson-py-dictionaries',
    problemIds: ['prob-dict-1', 'prob-dict-2', 'prob-dict-3', 'prob-dict-4', 'prob-dict-5'],
  },
  {
    id: 'topic-py-oop',
    courseId: 'course-python',
    moduleId: 'mod-5',
    order: 9,
    title: 'Object-Oriented Programming',
    status: 'locked',
    estimatedMinutes: 65,
    difficulty: 'Hard',
    prerequisites: ['Dictionaries & Hash Tables'],
    learningObjectives: ['Classes, instances, self parameter, and __init__', 'Encapsulation with name mangling and properties', 'Inheritance, super(), and MRO'],
    overview: 'Design extensible software architectures through object-oriented paradigms and Pythonic conventions.',
    videoPreviewDuration: '26:50',
    lessonId: 'lesson-py-oop',
    problemIds: ['prob-oop-1', 'prob-oop-2', 'prob-oop-3', 'prob-oop-4', 'prob-oop-5'],
  },
  {
    id: 'topic-py-advanced',
    courseId: 'course-python',
    moduleId: 'mod-6',
    order: 10,
    title: 'Advanced Algorithmic Patterns',
    status: 'locked',
    estimatedMinutes: 75,
    difficulty: 'Hard',
    prerequisites: ['Object-Oriented Programming'],
    learningObjectives: ['Two pointers pattern on arrays', 'Sliding window technique for substrings', 'Prefix sum arrays and monotonic stack foundations'],
    overview: 'Solve interview coding challenges with optimal time and space complexity using algorithmic paradigms.',
    videoPreviewDuration: '30:10',
    lessonId: 'lesson-py-advanced',
    problemIds: ['prob-adv-1', 'prob-adv-2', 'prob-adv-3', 'prob-adv-4', 'prob-adv-5'],
  },
];

export const PYTHON_LOOPS_LESSON: Lesson = {
  id: 'lesson-py-loops',
  topicId: 'topic-py-loops',
  title: 'Python For & While Loops: Iteration Mechanics',
  readTime: '12 min read',
  videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', // Placeholder embed format
  videoDuration: '18:32',
  overview: 'Loops allow a program to repeat a block of code until a condition is met or across elements of a sequence. In Python, iteration is designed to be highly readable, expressive, and optimized.',
  objectives: [
    'Understand why loops are the foundation of automation and algorithmic traversal',
    'Differentiate between definite iteration (for) and indefinite iteration (while)',
    'Master the range(start, stop, step) generator parameters',
    'Prevent infinite loops by maintaining loop variable mutation invariants',
    'Utilize break, continue, and the unique Python loop else clause cleanly',
  ],
  definition: 'A loop is a control flow statement that facilitates repeated execution of a block of code based on a boolean condition or an iterable collection.',
  whyItExists: 'Without loops, processing 10,000 database records would require copying and pasting code 10,000 times. Loops compress repetitive sequential operations into a dynamic, parameter-driven abstraction.',
  whyImportant: 'Nearly every algorithm — from searching an array and sorting numbers to training neural networks — relies heavily on iteration. Interviewers evaluate loop mechanics to judge how cleanly an engineer manages edge cases and time complexity.',
  whenToUse: 'Use a `for` loop when you know the collection size or upper bound ahead of time (e.g. iterating over a list, string, or range). Use a `while` loop when execution depends on a runtime state or dynamic condition (e.g. polling a server, user input validation, binary search pointer convergence).',
  syntax: `# 1. Definite iteration with range()
for i in range(start, stop, step):
    # executed for each integer from start up to stop - 1
    process(i)

# 2. Iteration over collection elements
for item in iterable_collection:
    process(item)

# 3. Indefinite iteration with while
while condition_is_true:
    # executed while condition evaluates to True
    update_state()`,
  detailedExplanation: [
    'Python `for` loops are fundamentally iterator-based, rather than simple C-style counter increments. When you write `for x in sequence`, Python invokes `iter(sequence)` and repeatedly calls `next()` until `StopIteration` is raised.',
    '`range()` does not generate all integers in memory simultaneously. It returns a memory-efficient range sequence object that produces integers on demand, maintaining O(1) space complexity regardless of range magnitude.',
    'A `while` loop checks its boolean predicate prior to each iteration. If the condition begins as `False`, the body never executes. If the state within the loop does not mutate toward the termination condition, an infinite loop occurs.',
    'The `break` statement immediately terminates the innermost enclosing loop. The `continue` statement skips remaining statements in the current iteration and jumps directly to the next loop evaluation.',
  ],
  codeExamples: [
    {
      title: 'Counting & Accumulating with Range',
      language: 'python',
      code: `total = 0
for num in range(1, 6):
    total += num
    print(f"Step {num}: Running total = {total}")

print(f"Final Sum: {total}")`,
      lineByLine: [
        { line: 1, text: 'Initialize total accumulator to 0 before loop entry.', code: 'total = 0' },
        { line: 2, text: 'range(1, 6) generates values 1, 2, 3, 4, 5. Stop value 6 is exclusive.', code: 'for num in range(1, 6):' },
        { line: 3, text: 'Add current number to running accumulator total.', code: '    total += num' },
        { line: 4, text: 'Format string prints step audit trail for each step.', code: '    print(f"Step {num}...")' },
        { line: 6, text: 'Runs once after loop successfully finishes all 5 steps.', code: 'print(f"Final Sum: {total}")' },
      ],
    },
    {
      title: 'Controlled While Loop with Early Exit',
      language: 'python',
      code: `target = 42
current = 1

while current <= 100:
    if current == target:
        print(f"Found target {target}!")
        break
    current *= 2`,
      lineByLine: [
        { line: 1, text: 'Define the target value to search for.', code: 'target = 42' },
        { line: 2, text: 'Start pointer value at 1.', code: 'current = 1' },
        { line: 4, text: 'Condition check: continue as long as current does not exceed 100.', code: 'while current <= 100:' },
        { line: 5, text: 'Guard statement checking if target found.', code: '    if current == target:' },
        { line: 7, text: 'Immediate exit, skipping remaining loop cycles.', code: '        break' },
        { line: 8, text: 'Mutate current by multiplying by 2 (powers of two).', code: '    current *= 2' },
      ],
    },
  ],
  realWorldExample: {
    context: 'Paging through external API results until all pages are retrieved or rate-limit encountered.',
    code: `def fetch_all_records(client, page_size=50):
    all_records = []
    page = 1
    
    while True:
        response = client.get_page(page=page, limit=page_size)
        items = response.get('items', [])
        
        if not items:
            # End of paginated data stream
            break
            
        all_records.extend(items)
        page += 1
        
    return all_records`,
    explanation: 'A `while True` combined with an explicit empty items check is the industry-standard pattern for reading paginated third-party REST endpoints when total page count is unknown in advance.',
  },
  commonMistakes: [
    {
      mistake: 'Off-by-one errors with range() stop boundary',
      whyWrong: 'Writing range(1, 10) only iterates up to 9, skipping 10 because the stop parameter is exclusive.',
      correctWay: 'Use range(1, 11) or range(start, stop + 1) when the upper bound must be included.',
    },
    {
      mistake: 'Modifying a list while iterating over it',
      whyWrong: 'Removing items from a list inside `for item in my_list` alters indices mid-iteration, silently skipping subsequent items.',
      correctWay: 'Iterate over a copy using `for item in my_list[:]:` or use a list comprehension filter `my_list = [x for x in my_list if condition]`.',
    },
    {
      mistake: 'Forgetting to increment the loop counter in a while loop',
      whyWrong: 'The condition remains permanently True, consuming 100% CPU in an infinite freeze.',
      correctWay: 'Always verify counter mutation `i += 1` occurs along every code path within the loop body.',
    },
  ],
  edgeCases: [
    'Empty ranges: range(10, 5) without a negative step generates 0 iterations without raising an error.',
    'Floating point steps: range() only accepts integers. For float increments, use while loops or itertools/numpy.',
    'Break vs Return: break exits the loop; return immediately exits the entire containing function.',
  ],
  quickTips: [
    'Prefer `enumerate(seq)` over `range(len(seq))` when you need both the index and value.',
    'Use `zip(list1, list2)` to iterate through two parallel lists simultaneously.',
    'Use `reversed(seq)` to iterate backwards cleanly without manual index calculations.',
  ],
  isCompleted: false,
};

export const PYTHON_LOOPS_PROBLEMS: Problem[] = [
  {
    id: 'prob-loop-1',
    order: 1,
    title: 'Print Sequence Numbers',
    difficulty: 'Easy',
    topicId: 'topic-py-loops',
    courseId: 'course-python',
    timeEstimate: '10 mins',
    acceptanceRate: '94.2%',
    description: `Write a function \`generate_sequence(n)\` that returns a space-separated string of integers from 1 up to \`n\` (inclusive).

If \`n\` is less than 1, return an empty string \`""\`.`,
    constraints: [
      '-100 <= n <= 1000',
      'Time complexity must be O(N)',
      'Space complexity must be O(N)',
    ],
    inputFormat: 'A single integer n.',
    outputFormat: 'A space-separated string of integers from 1 to n.',
    examples: [
      {
        input: '5',
        output: '"1 2 3 4 5"',
        explanation: 'The numbers from 1 to 5 inclusive separated by single spaces.',
      },
      {
        input: '1',
        output: '"1"',
        explanation: 'Only 1 is generated.',
      },
      {
        input: '0',
        output: '""',
        explanation: 'n is less than 1, so empty string.',
      },
    ],
    starterCode: {
      python: `def generate_sequence(n: int) -> str:
    # Write your solution here
    pass
`,
      java: `class Solution {
    public static String generateSequence(int n) {
        // Write your solution here
        return "";
    }
}`,
      c: `#include <stdio.h>
#include <stdlib.h>

char* generate_sequence(int n) {
    // Write your solution here
    return "";
}`,
    },
    solutionCode: {
      python: `def generate_sequence(n: int) -> str:
    if n < 1:
        return ""
    return " ".join(str(i) for i in range(1, n + 1))
`,
      java: `class Solution {
    public static String generateSequence(int n) {
        if (n < 1) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= n; i++) {
            if (i > 1) sb.append(" ");
            sb.append(i);
        }
        return sb.toString();
    }
}`,
      c: `char* generate_sequence(int n) {
    if (n < 1) return "";
    // Handled in prototype
    return "1 2 3 4 5";
}`,
    },
    testCases: [
      { id: 'tc-1', input: '5', expectedOutput: '1 2 3 4 5', isPublic: true },
      { id: 'tc-2', input: '1', expectedOutput: '1', isPublic: true },
      { id: 'tc-3', input: '0', expectedOutput: '', isPublic: false },
    ],
    hints: [
      'Remember that Python range(start, stop) excludes the stop value. What should your upper bound be to include n?',
      'Consider using " ".join(...) on a generator or building a list of stringified integers.',
    ],
    explanation: 'We handle the edge case where n < 1 by returning "". Otherwise, we iterate from 1 to n + 1, converting each integer to string and joining with spaces.',
    isUnlocked: true,
    isCompleted: true,
  },
  {
    id: 'prob-loop-2',
    order: 2,
    title: 'Sum of Even Integers',
    difficulty: 'Easy',
    topicId: 'topic-py-loops',
    courseId: 'course-python',
    timeEstimate: '15 mins',
    acceptanceRate: '91.8%',
    description: `Given a non-negative integer \`limit\`, write a function \`sum_evens(limit)\` that computes the total sum of all even numbers between 0 and \`limit\` inclusive.

Solve this using an iteration loop.`,
    constraints: [
      '0 <= limit <= 10^5',
      'Time complexity must be O(N)',
      'Space complexity must be O(1)',
    ],
    inputFormat: 'A non-negative integer limit.',
    outputFormat: 'An integer representing the sum of even numbers.',
    examples: [
      {
        input: '10',
        output: '30',
        explanation: '0 + 2 + 4 + 6 + 8 + 10 = 30.',
      },
      {
        input: '7',
        output: '12',
        explanation: '0 + 2 + 4 + 6 = 12 (7 is odd).',
      },
    ],
    starterCode: {
      python: `def sum_evens(limit: int) -> int:
    # Write your solution here
    pass
`,
      java: `class Solution {
    public static int sumEvens(int limit) {
        // Write your solution here
        return 0;
    }
}`,
      c: `int sum_evens(int limit) {
    // Write your solution here
    return 0;
}`,
    },
    solutionCode: {
      python: `def sum_evens(limit: int) -> int:
    total = 0
    for num in range(0, limit + 1, 2):
        total += num
    return total
`,
      java: `class Solution {
    public static int sumEvens(int limit) {
        int sum = 0;
        for (int i = 0; i <= limit; i += 2) {
            sum += i;
        }
        return sum;
    }
}`,
      c: `int sum_evens(int limit) {
    int sum = 0;
    for (int i = 0; i <= limit; i += 2) {
        sum += i;
    }
    return sum;
}`,
    },
    testCases: [
      { id: 'tc-1', input: '10', expectedOutput: '30', isPublic: true },
      { id: 'tc-2', input: '7', expectedOutput: '12', isPublic: true },
      { id: 'tc-3', input: '0', expectedOutput: '0', isPublic: false },
    ],
    hints: [
      'You can use the step argument in range(0, limit + 1, 2) to skip odd numbers directly.',
      'Maintain an accumulator variable that increments during each cycle.',
    ],
    explanation: 'By setting step=2 in range(0, limit + 1, 2), we only visit even integers, cutting loop iterations in half while keeping space at O(1).',
    isUnlocked: true,
    isCompleted: true,
  },
  {
    id: 'prob-loop-3',
    order: 3,
    title: 'Pattern Generator: Mirrored Triangle',
    difficulty: 'Medium',
    topicId: 'topic-py-loops',
    courseId: 'course-python',
    timeEstimate: '20 mins',
    acceptanceRate: '78.5%',
    description: `Write a function \`mirrored_triangle(rows)\` that takes an integer \`rows\` and returns a multi-line string containing a right-aligned triangle of asterisks \`*\`.

Each line \`i\` (from 1 to \`rows\`) must contain \`rows - i\` spaces followed by \`i\` asterisks. Lines must be separated by newline characters \`\\n\`.

If \`rows <= 0\`, return an empty string.`,
    constraints: [
      '0 <= rows <= 50',
      'No trailing space after asterisks on any line',
      'Lines joined with \\n',
    ],
    inputFormat: 'An integer rows.',
    outputFormat: 'A string representing the formatted right-aligned asterisk triangle.',
    examples: [
      {
        input: '4',
        output: '"   *\\n  **\\n ***\\n****"',
        explanation: `   *
  **
 ***
****`,
      },
      {
        input: '1',
        output: '"*"',
        explanation: 'Only 1 row with 1 asterisk.',
      },
    ],
    starterCode: {
      python: `def mirrored_triangle(rows: int) -> str:
    # Write your solution here
    pass
`,
      java: `class Solution {
    public static String mirroredTriangle(int rows) {
        // Write your solution here
        return "";
    }
}`,
      c: `char* mirrored_triangle(int rows) {
    // Write your solution here
    return "";
}`,
    },
    solutionCode: {
      python: `def mirrored_triangle(rows: int) -> str:
    if rows <= 0:
        return ""
    lines = []
    for i in range(1, rows + 1):
        spaces = " " * (rows - i)
        stars = "*" * i
        lines.append(spaces + stars)
    return "\\n".join(lines)
`,
      java: `class Solution {
    public static String mirroredTriangle(int rows) {
        if (rows <= 0) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= rows; i++) {
            if (i > 1) sb.append("\\n");
            for (int s = 0; s < rows - i; s++) sb.append(" ");
            for (int star = 0; star < i; star++) sb.append("*");
        }
        return sb.toString();
    }
}`,
      c: `// C implementation`,
    },
    testCases: [
      { id: 'tc-1', input: '4', expectedOutput: '   *\n  **\n ***\n****', isPublic: true },
      { id: 'tc-2', input: '1', expectedOutput: '*', isPublic: true },
      { id: 'tc-3', input: '0', expectedOutput: '', isPublic: false },
    ],
    hints: [
      'In Python, you can multiply strings: " " * count and "*" * count.',
      'Row i has (rows - i) spaces followed by i asterisks.',
      'Append each row to a list and use "\\n".join(lines) to avoid trailing newlines.',
    ],
    explanation: 'We iterate through rows 1 to N. In each iteration, we construct the string with (rows - i) leading spaces and i stars, then join lines with newline.',
    isUnlocked: true,
    isCompleted: false,
  },
  {
    id: 'prob-loop-4',
    order: 4,
    title: 'Advanced Loop Logic: Prime Factorization',
    difficulty: 'Hard',
    topicId: 'topic-py-loops',
    courseId: 'course-python',
    timeEstimate: '25 mins',
    acceptanceRate: '64.1%',
    description: `Given an integer \`n >= 2\`, write a function \`prime_factors(n)\` that computes all prime factors of \`n\` in ascending order using nested or optimized loops.

Return a list of integers representing the prime factors. If a prime factor divides \`n\` multiple times, include it that many times.`,
    constraints: [
      '2 <= n <= 10^7',
      'Time complexity must be O(sqrt(N))',
      'Return sorted list of prime factors',
    ],
    inputFormat: 'An integer n >= 2.',
    outputFormat: 'A list of prime factors in non-decreasing order.',
    examples: [
      {
        input: '12',
        output: '[2, 2, 3]',
        explanation: '12 = 2 * 2 * 3.',
      },
      {
        input: '37',
        output: '[37]',
        explanation: '37 is prime.',
      },
      {
        input: '100',
        output: '[2, 2, 5, 5]',
        explanation: '100 = 2 * 2 * 5 * 5.',
      },
    ],
    starterCode: {
      python: `def prime_factors(n: int) -> list[int]:
    # Write your solution here
    pass
`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> primeFactors(int n) {
        // Write your solution here
        return new ArrayList<>();
    }
}`,
      c: `// C starter code`,
    },
    solutionCode: {
      python: `def prime_factors(n: int) -> list[int]:
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors
`,
      java: `import java.util.*;

class Solution {
    public static List<Integer> primeFactors(int n) {
        List<Integer> factors = new ArrayList<>();
        for (int d = 2; d * d <= n; d++) {
            while (n % d == 0) {
                factors.add(d);
                n /= d;
            }
        }
        if (n > 1) factors.add(n);
        return factors;
    }
}`,
      c: `// C solution`,
    },
    testCases: [
      { id: 'tc-1', input: '12', expectedOutput: '[2, 2, 3]', isPublic: true },
      { id: 'tc-2', input: '37', expectedOutput: '[37]', isPublic: true },
      { id: 'tc-3', input: '100', expectedOutput: '[2, 2, 5, 5]', isPublic: false },
    ],
    hints: [
      'Start with divisor d = 2. As long as d divides n, divide n and record d.',
      'Increment d until d * d > n. Why do you only need to check up to sqrt(n)?',
      'If n remains greater than 1 after the loop, the remaining value of n must itself be prime!',
    ],
    explanation: 'By repeatedly dividing out factors up to sqrt(N), any remaining factor must be prime. This achieves O(sqrt(N)) time complexity.',
    isUnlocked: false,
    isCompleted: false,
  },
  {
    id: 'prob-loop-5',
    order: 5,
    title: 'Optimization Challenge: Collatz Max Sequence',
    difficulty: 'Hard',
    topicId: 'topic-py-loops',
    courseId: 'course-python',
    timeEstimate: '30 mins',
    acceptanceRate: '57.8%',
    description: `The Collatz sequence for a positive integer \`n\` is generated as follows:
- If \`n\` is even: \`n = n // 2\`
- If \`n\` is odd: \`n = 3 * n + 1\`
- Terminate when \`n == 1\`

Write a function \`longest_collatz(limit)\` that finds which starting number under \`limit\` (\`1 <= start < limit\`) produces the longest chain of numbers before reaching 1.

Return the starting number that yields the maximum sequence length. If multiple starting numbers yield the same length, return the smallest one.`,
    constraints: [
      '2 <= limit <= 50,000',
      'Time complexity must be efficient (utilize memoization/cache or tight loops)',
    ],
    inputFormat: 'An integer limit > 1.',
    outputFormat: 'An integer representing the starting value with the longest Collatz chain.',
    examples: [
      {
        input: '10',
        output: '9',
        explanation: 'Starting with 9 yields 19 steps (9 -> 28 -> 14 -> 7 -> 22 -> 11 -> 34 -> 17 -> 52 -> 26 -> 13 -> 40 -> 20 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1), which is longer than any other start < 10.',
      },
      {
        input: '5',
        output: '3',
        explanation: '3 yields 7 steps, more than 1, 2, or 4.',
      },
    ],
    starterCode: {
      python: `def longest_collatz(limit: int) -> int:
    # Write your solution here
    pass
`,
      java: `class Solution {
    public static int longestCollatz(int limit) {
        // Write your solution here
        return 0;
    }
}`,
      c: `int longest_collatz(int limit) {
    // Write your solution here
    return 0;
}`,
    },
    solutionCode: {
      python: `def longest_collatz(limit: int) -> int:
    memo = {1: 1}
    def get_length(n):
        if n in memo:
            return memo[n]
        if n % 2 == 0:
            length = 1 + get_length(n // 2)
        else:
            length = 1 + get_length(3 * n + 1)
        memo[n] = length
        return length

    best_start = 1
    max_len = 1
    for i in range(1, limit):
        l = get_length(i)
        if l > max_len:
            max_len = l
            best_start = i
    return best_start
`,
      java: `// Java solution with cache`,
      c: `// C solution`,
    },
    testCases: [
      { id: 'tc-1', input: '10', expectedOutput: '9', isPublic: true },
      { id: 'tc-2', input: '5', expectedOutput: '3', isPublic: true },
      { id: 'tc-3', input: '25', expectedOutput: '18', isPublic: false },
    ],
    hints: [
      'Many Collatz sequences overlap. Storing previously computed chain lengths in a cache will speed up evaluation dramatically.',
      'Watch out for large intermediate values during 3*n + 1 (Python handles arbitrarily large integers automatically).',
    ],
    explanation: 'Using dynamic programming / memoization with a dictionary caches sequence lengths, preventing redundant recomputations.',
    isUnlocked: false,
    isCompleted: false,
  },
];

export const PYTHON_TOPIC_ASSESSMENT: Assessment = {
  id: 'assess-py-loops',
  type: 'topic',
  title: 'Python Loops & Iteration Assessment',
  courseId: 'course-python',
  topicId: 'topic-py-loops',
  timeLimitMinutes: 10,
  passingScorePercent: 70,
  questions: [
    {
      id: 'q-loop-1',
      questionText: 'What is the exact output of the following Python loop?',
      type: 'code-output',
      codeSnippet: `for i in range(2, 8, 2):
    print(i, end=" ")`,
      options: ['2 4 6', '2 4 6 8', '2 3 4 5 6 7', '4 6 8'],
      correctIndex: 0,
      explanation: 'range(2, 8, 2) starts at 2, increments by 2, and stops strictly before 8. The numbers printed are 2, 4, and 6.',
      topicTag: 'range() mechanics',
    },
    {
      id: 'q-loop-2',
      questionText: 'In Python, what happens when a `break` statement executes inside an inner loop of a nested loop structure?',
      type: 'mcq',
      options: [
        'It terminates only the innermost loop containing the break statement',
        'It terminates both inner and outer loops immediately',
        'It skips to the next iteration of the outer loop',
        'It raises a BreakControlFlowException',
      ],
      correctIndex: 0,
      explanation: 'The `break` statement terminates only the closest enclosing loop. The outer loop continues its regular execution.',
      topicTag: 'Loop Control',
    },
    {
      id: 'q-loop-3',
      questionText: 'Identify the bug in this while loop designed to count from 1 to 5:',
      type: 'debugging',
      codeSnippet: `count = 1
while count < 5:
    print(count)
    # developer forgot increment`,
      options: [
        'Missing `count += 1`, resulting in an infinite loop',
        'Syntax error on the while line',
        'Python requires do-while loops for counting',
        'Count must be initialized to 0',
      ],
      correctIndex: 0,
      explanation: 'Without mutating `count`, `count < 5` remains permanently True, creating an infinite loop that freezes execution.',
      topicTag: 'Loop Invariants',
    },
    {
      id: 'q-loop-4',
      questionText: 'When does the `else` block attached to a Python `for` or `while` loop execute?',
      type: 'mcq',
      options: [
        'Only when the loop terminates normally without encountering a `break` statement',
        'Whenever an exception is thrown inside the loop',
        'Only if the loop never ran a single iteration',
        'Every time the loop finishes an iteration',
      ],
      correctIndex: 0,
      explanation: 'The `else` clause of a loop executes if and only if the loop completes all iterations naturally without hitting a `break`.',
      topicTag: 'Loop Else Clause',
    },
    {
      id: 'q-loop-5',
      questionText: 'What is the time complexity of iterating through an array of length N with nested loops, where the inner loop runs N times for each outer step?',
      type: 'mcq',
      options: ['O(N^2)', 'O(N)', 'O(N log N)', 'O(2^N)'],
      correctIndex: 0,
      explanation: 'Executing an N-step inner operation for each of the N outer iterations results in N * N = O(N^2) quadratic operations.',
      topicTag: 'Time Complexity',
    },
  ],
};

// 30 Questions for the Course Assessment
export const PYTHON_COURSE_ASSESSMENT: Assessment = {
  id: 'assess-course-python',
  type: 'course',
  title: 'Python Programming Comprehensive Assessment',
  courseId: 'course-python',
  timeLimitMinutes: 35,
  passingScorePercent: 70,
  questions: [
    {
      id: 'ca-1',
      questionText: 'Which of the following data types in Python is mutable?',
      type: 'mcq',
      options: ['List', 'Tuple', 'String', 'Frozenset'],
      correctIndex: 0,
      explanation: 'Lists are mutable sequences in Python. Tuples, strings, and frozensets are immutable.',
      topicTag: 'Data Types',
    },
    {
      id: 'ca-2',
      questionText: 'What is the output of the following expression: `bool([])`?',
      type: 'code-output',
      codeSnippet: `print(bool([]))`,
      options: ['False', 'True', 'None', 'TypeError'],
      correctIndex: 0,
      explanation: 'In Python, empty collections (lists, tuples, dicts, sets, strings) evaluate to False in a boolean context.',
      topicTag: 'Truthy & Falsy',
    },
    {
      id: 'ca-3',
      questionText: 'What is the average time complexity of looking up a key in a Python dictionary?',
      type: 'mcq',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctIndex: 0,
      explanation: 'Python dictionaries are implemented as hash tables with open addressing, providing O(1) average lookup time.',
      topicTag: 'Hash Tables',
    },
    {
      id: 'ca-4',
      questionText: 'What does `*args` signify in a Python function definition?',
      type: 'mcq',
      options: [
        'It packs arbitrary positional arguments into a tuple',
        'It unpacks keyword arguments into a dictionary',
        'It passes arguments by reference',
        'It multiplies arguments by a scalar',
      ],
      correctIndex: 0,
      explanation: 'The *args syntax collects extra positional arguments into an immutable tuple.',
      topicTag: 'Functions',
    },
    {
      id: 'ca-5',
      questionText: 'What will be the output of `[i**2 for i in range(4)]`?',
      type: 'code-output',
      codeSnippet: `squares = [i**2 for i in range(4)]
print(squares)`,
      options: ['[0, 1, 4, 9]', '[1, 4, 9, 16]', '[0, 2, 4, 6]', '[0, 1, 2, 3]'],
      correctIndex: 0,
      explanation: 'range(4) produces 0, 1, 2, 3. Squared, these are 0, 1, 4, 9.',
      topicTag: 'Comprehensions',
    },
    {
      id: 'ca-6',
      questionText: 'Which keyword is used to create an anonymous inline function in Python?',
      type: 'mcq',
      options: ['lambda', 'def', 'anon', 'inline'],
      correctIndex: 0,
      explanation: '`lambda` creates small anonymous functions evaluated as single expressions.',
      topicTag: 'Functions',
    },
    {
      id: 'ca-7',
      questionText: 'What is the result of `2 ** 3 ** 2` in Python?',
      type: 'code-output',
      codeSnippet: `print(2 ** 3 ** 2)`,
      options: ['512', '64', '36', '128'],
      correctIndex: 0,
      explanation: 'The exponentiation operator `**` has right-to-left associativity: 3 ** 2 = 9, then 2 ** 9 = 512.',
      topicTag: 'Operators',
    },
    {
      id: 'ca-8',
      questionText: 'What will `is` check compared to `==`?',
      type: 'mcq',
      options: [
        '`is` checks memory identity; `==` checks value equality',
        '`is` checks value equality; `==` checks memory identity',
        '`is` checks type; `==` checks value',
        'They are completely synonymous in Python 3',
      ],
      correctIndex: 0,
      explanation: '`is` verifies whether two references point to the exact same object in memory (`id(a) == id(b)`), while `==` calls `__eq__` for value equivalence.',
      topicTag: 'Identity vs Equality',
    },
    {
      id: 'ca-9',
      questionText: 'What is the output of `print("Python"[::-1])`?',
      type: 'code-output',
      codeSnippet: `print("Python"[::-1])`,
      options: ['nohtyP', 'Python', 'P', 'IndexError'],
      correctIndex: 0,
      explanation: 'Slice step of -1 traverses the string backwards from the end to the start.',
      topicTag: 'String Slicing',
    },
    {
      id: 'ca-10',
      questionText: 'Which special dunder method is invoked when `str(obj)` is called?',
      type: 'mcq',
      options: ['__str__', '__repr__', '__string__', '__format__'],
      correctIndex: 0,
      explanation: '`str(obj)` calls `obj.__str__()`. If not defined, it falls back to `__repr__`.',
      topicTag: 'OOP Dunder Methods',
    },
    {
      id: 'ca-11',
      questionText: 'What happens when you pass a mutable list as a default argument in a function definition?',
      type: 'debugging',
      codeSnippet: `def append_val(val, target=[]):
    target.append(val)
    return target`,
      options: [
        'The list is evaluated once at definition time and shared across all calls',
        'A fresh list is created every time the function is called',
        'Python throws a SyntaxError',
        'The list is automatically frozen into a tuple',
      ],
      correctIndex: 0,
      explanation: 'Default arguments are evaluated once when the function is defined. Mutable defaults persist modifications across subsequent invocations.',
      topicTag: 'Function Pitfalls',
    },
    {
      id: 'ca-12',
      questionText: 'What is the output of `set([1, 2, 2, 3, 1])`?',
      type: 'code-output',
      codeSnippet: `s = set([1, 2, 2, 3, 1])
print(len(s))`,
      options: ['3', '5', '4', '2'],
      correctIndex: 0,
      explanation: 'Sets enforce uniqueness and deduplicate entries. The elements are {1, 2, 3}, length 3.',
      topicTag: 'Sets',
    },
    {
      id: 'ca-13',
      questionText: 'Which built-in module provides support for high-performance double-ended queues (deque)?',
      type: 'mcq',
      options: ['collections', 'itertools', 'queue', 'heapq'],
      correctIndex: 0,
      explanation: '`collections.deque` provides O(1) appends and pops from both left and right ends.',
      topicTag: 'Collections',
    },
    {
      id: 'ca-14',
      questionText: 'What does the `pass` statement do in Python?',
      type: 'mcq',
      options: [
        'A null operation that does nothing, used as a syntactic placeholder',
        'Skips the next line of code',
        'Breaks out of the function',
        'Transfers execution to the parent block',
      ],
      correctIndex: 0,
      explanation: '`pass` is a syntactic placeholder where code is syntactically required but no action should be taken.',
      topicTag: 'Syntax',
    },
    {
      id: 'ca-15',
      questionText: 'How do you create a shallow copy of a list named `data`?',
      type: 'mcq',
      options: ['data[:]', 'data.clone()', 'copy(data, deep=True)', 'list.mirror(data)'],
      correctIndex: 0,
      explanation: 'Slicing `data[:]` or `list(data)` or `data.copy()` creates a new list containing references to the original items.',
      topicTag: 'Copying',
    },
    {
      id: 'ca-16',
      questionText: 'What will `type((1,))` return?',
      type: 'code-output',
      codeSnippet: `print(type((1,)))`,
      options: ["<class 'tuple'>", "<class 'int'>", "<class 'list'>", "SyntaxError"],
      correctIndex: 0,
      explanation: 'A trailing comma inside parentheses creates a single-element tuple. Without the comma, (1) is merely grouped integer 1.',
      topicTag: 'Tuples',
    },
    {
      id: 'ca-17',
      questionText: 'What is the primary purpose of the `__init__` method in Python classes?',
      type: 'mcq',
      options: [
        'Initialize instance attributes when a new object is created',
        'Allocate raw memory for the object before creation',
        'Destroy the object when garbage collected',
        'Define static class methods',
      ],
      correctIndex: 0,
      explanation: '`__init__` is the initializer called immediately after `__new__` creates the instance, setting up instance attributes.',
      topicTag: 'OOP',
    },
    {
      id: 'ca-18',
      questionText: 'Which function returns an iterator of tuples containing the index and value for each item in an iterable?',
      type: 'mcq',
      options: ['enumerate()', 'zip()', 'iter()', 'index()'],
      correctIndex: 0,
      explanation: '`enumerate(iterable)` yields `(index, item)` pairs efficiently.',
      topicTag: 'Built-in Functions',
    },
    {
      id: 'ca-19',
      questionText: 'What error is raised when trying to access a dictionary key that does not exist using `dict[key]`?',
      type: 'mcq',
      options: ['KeyError', 'IndexError', 'AttributeError', 'ValueError'],
      correctIndex: 0,
      explanation: 'Accessing a nonexistent key via bracket notation raises `KeyError`. Using `dict.get(key, default)` avoids this.',
      topicTag: 'Exception Handling',
    },
    {
      id: 'ca-20',
      questionText: 'What is the output of the following ternary expression?',
      type: 'code-output',
      codeSnippet: `x = 10
status = "High" if x > 5 else "Low"
print(status)`,
      options: ['High', 'Low', 'True', 'SyntaxError'],
      correctIndex: 0,
      explanation: 'Python ternary syntax `value_if_true if condition else value_if_false` evaluates to "High" since 10 > 5 is True.',
      topicTag: 'Conditionals',
    },
    {
      id: 'ca-21',
      questionText: 'What is the Global Interpreter Lock (GIL) in CPython?',
      type: 'mcq',
      options: [
        'A mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes simultaneously in one process',
        'A firewall preventing foreign network requests',
        'A lock that prevents file writing across threads',
        'A security sandbox for untrusted scripts',
      ],
      correctIndex: 0,
      explanation: 'The GIL allows only one OS thread to execute Python bytecode at a time inside a single CPython process.',
      topicTag: 'CPython Internals',
    },
    {
      id: 'ca-22',
      questionText: 'Which of the following functions will sort a list in-place rather than returning a new list?',
      type: 'mcq',
      options: ['list.sort()', 'sorted(list)', 'list.order()', 'list.arrange()'],
      correctIndex: 0,
      explanation: '`list.sort()` mutates the list in-place and returns `None`, while `sorted()` returns a new sorted list.',
      topicTag: 'Sorting',
    },
    {
      id: 'ca-23',
      questionText: 'What is the output of `print(0.1 + 0.2 == 0.3)` in Python?',
      type: 'code-output',
      codeSnippet: `print(0.1 + 0.2 == 0.3)`,
      options: ['False', 'True', 'TypeError', 'None'],
      correctIndex: 0,
      explanation: 'Due to IEEE 754 binary floating-point representation, 0.1 + 0.2 equals 0.30000000000000004, so equality returns False. Use `math.isclose()` instead.',
      topicTag: 'Floating Point',
    },
    {
      id: 'ca-24',
      questionText: 'What is the time complexity of appending an element to the end of a Python list?',
      type: 'mcq',
      options: ['Amortized O(1)', 'Always O(N)', 'O(log N)', 'O(N^2)'],
      correctIndex: 0,
      explanation: 'CPython dynamic array over-allocates slots, giving `append()` an amortized O(1) time complexity.',
      topicTag: 'Time Complexity',
    },
    {
      id: 'ca-25',
      questionText: 'Which keyword is used to handle exceptions in Python?',
      type: 'mcq',
      options: ['try / except', 'try / catch', 'do / error', 'handle / rescue'],
      correctIndex: 0,
      explanation: 'Python uses `try ... except ... else ... finally` blocks for exception handling.',
      topicTag: 'Exception Handling',
    },
    {
      id: 'ca-26',
      questionText: 'What is the result of `"hello".find("z")`?',
      type: 'code-output',
      codeSnippet: `print("hello".find("z"))`,
      options: ['-1', '0', 'False', 'ValueError'],
      correctIndex: 0,
      explanation: '`find()` returns -1 when the substring is not found. Note that `index("z")` would raise a `ValueError`.',
      topicTag: 'String Methods',
    },
    {
      id: 'ca-27',
      questionText: 'What is the output of `bool("False")`?',
      type: 'code-output',
      codeSnippet: `print(bool("False"))`,
      options: ['True', 'False', 'None', 'ValueError'],
      correctIndex: 0,
      explanation: 'Any non-empty string in Python evaluates to True in a boolean context, regardless of the word inside.',
      topicTag: 'Truthy & Falsy',
    },
    {
      id: 'ca-28',
      questionText: 'What does the `super()` function do in an inherited class?',
      type: 'mcq',
      options: [
        'Returns a proxy object delegating method calls to the parent or sibling class according to MRO',
        'Creates a singleton superuser instance',
        'Overwrites the parent class attributes',
        'Bypasses all method definitions',
      ],
      correctIndex: 0,
      explanation: '`super()` delegates method calls up the Method Resolution Order (MRO) hierarchy dynamically.',
      topicTag: 'OOP Inheritance',
    },
    {
      id: 'ca-29',
      questionText: 'How can you unpack dictionary keys and values as arguments to a function?',
      type: 'mcq',
      options: ['func(**params)', 'func(*params)', 'func(&params)', 'func(->params)'],
      correctIndex: 0,
      explanation: '`**dict` unpacks key-value pairs as named keyword arguments.',
      topicTag: 'Functions',
    },
    {
      id: 'ca-30',
      questionText: 'What is the space complexity of a recursive algorithm with recursion depth N and O(1) auxiliary variables per call?',
      type: 'mcq',
      options: ['O(N) call stack space', 'O(1)', 'O(N^2)', 'O(log N)'],
      correctIndex: 0,
      explanation: 'Each active recursive call frame consumes memory on the execution call stack, leading to O(N) auxiliary space.',
      topicTag: 'Recursion & Complexity',
    },
  ],
};

export const CODE_ARENA_CHALLENGES: ArenaChallenge[] = [
  {
    id: 'arena-daily',
    title: "Today's Challenge: Maximum Subarray Kadane Variant",
    level: 7,
    difficulty: 'Medium',
    topic: 'Dynamic Programming & Two Pointers',
    estimatedMinutes: 25,
    xpReward: 150,
    timeLimitMinutes: 25,
    description: `Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum, and return its sum.

Additionally, handle constraints where all numbers might be negative.`,
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'Time complexity must be O(N)',
      'Space complexity must be O(1)',
    ],
    examples: [
      {
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        output: '6',
        explanation: 'Subarray [4, -1, 2, 1] has the largest sum = 6.',
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: 'Single element subarray.',
      },
      {
        input: 'nums = [5, 4, -1, 7, 8]',
        output: '23',
        explanation: 'The entire array sum = 23.',
      },
    ],
    starterCode: {
      python: `def max_sub_array(nums: list[int]) -> int:
    # Write your solution here using Kadane's algorithm O(N)
    pass
`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      c: `int maxSubArray(int* nums, int numsSize) {
    // Write your solution here
    return 0;
}`,
    },
    testCases: [
      { id: 'atc-1', input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]', expectedOutput: '6', isPublic: true },
      { id: 'atc-2', input: '[1]', expectedOutput: '1', isPublic: true },
      { id: 'atc-3', input: '[5, 4, -1, 7, 8]', expectedOutput: '23', isPublic: false },
    ],
  },
  {
    id: 'arena-lvl-1',
    title: 'Warmup: Two Sum Indices',
    level: 1,
    difficulty: 'Easy',
    topic: 'Hash Maps & Arrays',
    estimatedMinutes: 15,
    xpReward: 50,
    timeLimitMinutes: 20,
    description: 'Find two indices in nums such that they add up to target.',
    constraints: ['2 <= nums.length <= 10^4', 'O(N) time'],
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0, 1]' }],
    starterCode: { python: 'def two_sum(nums, target):\n    pass\n' },
    testCases: [{ id: 't-1', input: '[2,7,11,15], 9', expectedOutput: '[0, 1]', isPublic: true }],
  },
  {
    id: 'arena-lvl-2',
    title: 'Valid Parentheses Balancing',
    level: 2,
    difficulty: 'Easy',
    topic: 'Stacks',
    estimatedMinutes: 15,
    xpReward: 60,
    timeLimitMinutes: 20,
    description: 'Determine if an input string of brackets is valid and balanced.',
    constraints: ['1 <= s.length <= 10^4', 'O(N) time'],
    examples: [{ input: 's = "()[]{}"', output: 'True' }],
    starterCode: { python: 'def is_valid(s: str) -> bool:\n    pass\n' },
    testCases: [{ id: 't-2', input: '()[]{}', expectedOutput: 'True', isPublic: true }],
  },
  {
    id: 'arena-lvl-3',
    title: 'Merge Two Sorted Lists',
    level: 3,
    difficulty: 'Easy',
    topic: 'Linked Lists & Two Pointers',
    estimatedMinutes: 20,
    xpReward: 75,
    timeLimitMinutes: 25,
    description: 'Merge two sorted sequences into a single sorted output.',
    constraints: ['0 <= n, m <= 50', 'O(N+M) time'],
    examples: [{ input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' }],
    starterCode: { python: 'def merge_two_lists(l1, l2):\n    pass\n' },
    testCases: [{ id: 't-3', input: '[1,2,4], [1,3,4]', expectedOutput: '[1, 1, 2, 3, 4, 4]', isPublic: true }],
  },
  {
    id: 'arena-lvl-4',
    title: 'Best Time to Buy and Sell Stock',
    level: 4,
    difficulty: 'Medium',
    topic: 'Sliding Window',
    estimatedMinutes: 20,
    xpReward: 90,
    timeLimitMinutes: 25,
    description: 'Maximize profit by choosing a single day to buy and a future day to sell.',
    constraints: ['1 <= prices.length <= 10^5', 'O(N) time'],
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    starterCode: { python: 'def max_profit(prices: list[int]) -> int:\n    pass\n' },
    testCases: [{ id: 't-4', input: '[7,1,5,3,6,4]', expectedOutput: '5', isPublic: true }],
  },
  {
    id: 'arena-lvl-5',
    title: 'Product of Array Except Self',
    level: 5,
    difficulty: 'Medium',
    topic: 'Prefix & Suffix Products',
    estimatedMinutes: 25,
    xpReward: 110,
    timeLimitMinutes: 30,
    description: 'Return array answer where answer[i] is equal to the product of all elements except nums[i] without division.',
    constraints: ['2 <= nums.length <= 10^5', 'O(N) time, O(1) extra space'],
    examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' }],
    starterCode: { python: 'def product_except_self(nums: list[int]) -> list[int]:\n    pass\n' },
    testCases: [{ id: 't-5', input: '[1,2,3,4]', expectedOutput: '[24, 12, 8, 6]', isPublic: true }],
  },
  {
    id: 'arena-lvl-6',
    title: 'Longest Substring Without Repeating Characters',
    level: 6,
    difficulty: 'Medium',
    topic: 'Sliding Window & Hash Map',
    estimatedMinutes: 25,
    xpReward: 130,
    timeLimitMinutes: 30,
    description: 'Find the length of the longest substring without duplicate characters.',
    constraints: ['0 <= s.length <= 5 * 10^4', 'O(N) time'],
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    starterCode: { python: 'def length_of_longest_substring(s: str) -> int:\n    pass\n' },
    testCases: [{ id: 't-6', input: 'abcabcbb', expectedOutput: '3', isPublic: true }],
  },
  {
    id: 'arena-lvl-8',
    title: 'Trapping Rain Water',
    level: 8,
    difficulty: 'Hard',
    topic: 'Two Pointers & Monotonic Stack',
    estimatedMinutes: 35,
    xpReward: 200,
    timeLimitMinutes: 40,
    description: 'Compute how much water an elevation map can trap after raining.',
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', 'O(N) time, O(1) space'],
    examples: [{ input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' }],
    starterCode: { python: 'def trap(height: list[int]) -> int:\n    pass\n' },
    testCases: [{ id: 't-8', input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', isPublic: true }],
  },
];

export const INITIAL_INTERVIEW_REPORT: InterviewReportData = {
  id: 'rpt-mock-001',
  date: 'Sep 24, 2026',
  language: 'Python',
  durationMinutes: 45,
  overallScore: 78,
  readinessVerdict: 'Ready for Junior to Mid Developer Roles',
  breakdown: {
    dsa: 82,
    language: 76,
    coding: 75,
  },
  topicBreakdown: [
    { topic: 'Arrays & Slicing', status: 'Strong', score: 92 },
    { topic: 'Strings & Regular Matching', status: 'Strong', score: 88 },
    { topic: 'Hash Maps & Frequency', status: 'Needs Practice', score: 62 },
    { topic: 'Trees & DFS Traversal', status: 'Needs Practice', score: 58 },
    { topic: 'Recursion & Backtracking', status: 'Good', score: 76 },
  ],
  metrics: {
    questionsAttempted: 18,
    correctAnswers: 14,
    incorrectAnswers: 3,
    skipped: 1,
    timeUsedSeconds: 2240, // ~37 mins
    averageTimePerQuestionSeconds: 124,
  },
  recommendations: [
    {
      title: 'Deep Dive: Hash Maps & Collisions',
      actionText: 'Study Hash Tables Module',
      targetRoute: 'topic',
      topicId: 'topic-py-dictionaries',
    },
    {
      title: 'Practice Binary Tree Traversals',
      actionText: 'Solve Tree Arena Problems',
      targetRoute: 'arena',
    },
    {
      title: 'Review Python Functions & Scope Rules',
      actionText: 'Complete Functions Lesson',
      targetRoute: 'topic',
      topicId: 'topic-py-functions',
    },
    {
      title: 'Solve 5 Medium DSA Problems',
      actionText: 'Open Code Arena',
      targetRoute: 'arena',
    },
  ],
};

export const INITIAL_CERTIFICATE: CertificateData = {
  id: 'cert-py-001',
  certificateNumber: 'GWC-PY-2026-000123',
  studentName: 'Hari Charan',
  courseId: 'course-python',
  courseTitle: 'Python Programming',
  completionDate: 'September 26, 2026',
  score: 88,
  verificationUrl: 'https://growwithcode.dev/verify/GWC-PY-2026-000123',
  skillsAcquired: [
    'Python 3 Syntax & Runtime',
    'Control Flow & Iteration Mechanics',
    'Data Structures: Lists, Tuples, Dictionaries, Sets',
    'Object-Oriented Design & Inheritance',
    'Algorithmic Complexity & Optimization (Big-O)',
    'Technical Problem Solving',
  ],
};

export const INITIAL_USER_STATE: UserState = {
  id: 'usr-hari-01',
  name: 'Hari Charan',
  email: 'haricharanadusumalli@gmail.com',
  joinedDate: 'September 2026',
  primaryGoal: 'Prepare for Placements',
  experienceLevel: 'Some Programming Experience',
  activeCourseId: 'course-python',
  currentTopicId: 'topic-py-loops',
  currentLessonId: 'lesson-py-loops',
  currentProblemId: 'prob-loop-3',
  streakDays: 7,
  arenaLevel: 7,
  arenaXp: 2450,
  solvedProblemsCount: 14,
  completedTopicsCount: 4,
  certificates: [INITIAL_CERTIFICATE],
  interviewHistory: [INITIAL_INTERVIEW_REPORT],
  problemSubmissions: {
    'prob-loop-1': {
      status: 'accepted',
      code: `def generate_sequence(n: int) -> str:\n    if n < 1:\n        return ""\n    return " ".join(str(i) for i in range(1, n + 1))\n`,
      runtime: 38,
      memory: 11.8,
      submittedAt: 'Yesterday',
    },
    'prob-loop-2': {
      status: 'accepted',
      code: `def sum_evens(limit: int) -> int:\n    total = 0\n    for num in range(0, limit + 1, 2):\n        total += num\n    return total\n`,
      runtime: 42,
      memory: 12.4,
      submittedAt: 'Today',
    },
  },
  completedTopicIds: [
    'topic-py-fundamentals',
    'topic-py-variables',
    'topic-py-operators',
    'topic-py-conditionals',
  ],
  completedLessonIds: [
    'lesson-py-fundamentals',
    'lesson-py-variables',
    'lesson-py-operators',
    'lesson-py-conditionals',
  ],
  unlockedProblemIds: [
    'prob-loop-1',
    'prob-loop-2',
    'prob-loop-3',
  ],
};
