// Função principal para iniciar a ordenação com o algoritmo selecionado
function sort(algorithm) {
    let input = document.getElementById("input").value.trim();
    let numbers = input.split(",").map(Number); // Divide a entrada em uma matriz de números

    let steps = []; // Array para armazenar os passos intermediários da ordenação
    let sorted; // Variável para armazenar o array ordenado

    // Seleciona o algoritmo de ordenação com base na escolha do usuário
    switch (algorithm) {
        case "insertion":
            sorted = insertionSort(numbers.slice(), steps); // Ordena usando o Insertion Sort
            break;
        case "merge":
            sorted = mergeSort(numbers.slice(), steps); // Ordena usando o Merge Sort
            break;
        case "bubble":
            sorted = bubbleSort(numbers.slice(), steps); // Ordena usando o Bubble Sort
            break;
        case "quick":
            sorted = quickSort(numbers.slice(), steps); // Ordena usando o Quick Sort
            break;
        case "heap":
            sorted = heapSort(numbers.slice(), steps); // Ordena usando o Heap Sort
            break;
        case "selection":
            sorted = selectionSort(numbers.slice(), steps); // Ordena usando o Selection Sort
            break;
        default:
            alert("Invalid algorithm"); // Mostra um alerta se o algoritmo selecionado for inválido
            return;
    }

    displaySteps(steps, sorted); // Exibe os passos intermediários e o array ordenado
}

// Função de ordenação por inserção
function insertionSort(arr, steps) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        steps.push(arr.slice()); // Adiciona uma cópia do array após cada iteração para mostrar o progresso
    }
    return arr;
}

// Função de ordenação por mesclagem
function mergeSort(arr, steps) {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    const leftSorted = mergeSort(left, steps);
    const rightSorted = mergeSort(right, steps);
    const merged = merge(leftSorted, rightSorted, steps);
    steps.push({ left: left.slice(), right: right.slice(), merged: merged.slice() });
    return merged;
}

// Função auxiliar para mesclar duas submatrizes ordenadas
function merge(left, right, steps) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// Função de ordenação por bolha
function bubbleSort(arr, steps) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                steps.push(arr.slice()); // Adiciona uma cópia do array após cada iteração para mostrar o progresso
            }
        }
    }
    return arr;
}

// Função de ordenação rápida (Quick Sort)
function quickSort(arr, steps) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    const sortedLeft = quickSort(left, steps);
    const sortedRight = quickSort(right, steps);
    const sortedArray = [...sortedLeft, pivot, ...sortedRight];
    steps.push(sortedArray.slice());
    return sortedArray;
}

// Função de ordenação por heap (Heap Sort)
function heapSort(arr, steps) {
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    }
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        steps.push(arr.slice());
        heapify(arr, i, 0);
    }
    steps.push(arr.slice());
    return arr;
}

// Função de ordenação por seleção (Selection Sort)
function selectionSort(arr, steps) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        steps.push(arr.slice());
    }
    return arr;
}

// Função para exibir os passos intermediários e o array ordenado
function displaySteps(steps, sortedArray) {
    let output = document.getElementById("output");
    output.innerHTML = "";
    steps.forEach((step, index) => {
        let div = document.createElement("div");
        div.classList.add("output-step");
        if ("merged" in step) {
            div.innerHTML = `<p>Step ${index + 1}:</p><p>Left: [${step.left.join(", ")}]</p><p>Right: [${step.right.join(", ")}]</p><p>Merged: [${step.merged.join(", ")}]</p>`;
        } else {
            div.innerHTML = `<p>Step ${index + 1}: [${step.join(", ")}]</p>`;
        }
        output.appendChild(div);
    });
    let div = document.createElement("div");
    div.textContent = `Sorted Array: [${sortedArray.join(", ")}]`;
    output.appendChild(div);
}
