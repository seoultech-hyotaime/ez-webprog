window.onload = function () {
    document.getElementById("runCode").addEventListener("click", function () {
        const code = document.getElementById("codeEditor").value;
        const resultFrame = document.getElementById("resultFrame");

        // iframe에 작성한 코드 삽입
        resultFrame.contentDocument.open();
        resultFrame.contentDocument.write(code);
        resultFrame.contentDocument.close();
    });


// 드래그 핸들
    const dragHandle = document.querySelector('.drag-handle');
    const editor = document.querySelector('.editor');
    const output = document.querySelector('.output');
    const iframe = document.querySelector('#resultFrame'); // iframe 선택
    const header = document.querySelector('.navbar'); // 헤더 선택

    let isDragging = false;
    let headerHeight = header.offsetHeight; // 헤더 높이 캐싱

// 반응형 레이아웃: 창 크기 변경 시 헤더 높이 업데이트
    window.addEventListener('resize', () => {
        headerHeight = header.offsetHeight;
    });

// 드래그 시작
    dragHandle.addEventListener('mousedown', () => {
        isDragging = true;
        headerHeight = header.offsetHeight; // 드래그 시작 시 헤더 높이 다시 캐싱
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none'; // 드래그 중 텍스트 선택 방지
    });

// 드래그 중
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // 컨테이너 영역과 마우스 위치 계산
        const containerRect = dragHandle.parentElement.getBoundingClientRect();
        const offsetY = e.clientY - containerRect.top; // 드래그 핸들의 Y 좌표
        const totalHeight = containerRect.height;

        // 헤더 높이를 반영한 Y 좌표 계산
        const adjustedOffsetY = offsetY - headerHeight;

        // 드래그 핸들의 중심을 기준으로 높이 조정
        const editorHeight = adjustedOffsetY - dragHandle.offsetHeight / 2; // 핸들 높이의 절반 보정
        const outputHeight = totalHeight - adjustedOffsetY - dragHandle.offsetHeight; // 나머지 높이 계산

        // 최소 높이 제한
        if (editorHeight > 50 && outputHeight > 50) {
            editor.style.height = `${editorHeight}px`;
            output.style.height = `${outputHeight}px`;

            // iframe 높이도 동기화
            iframe.style.height = `${outputHeight - 135}px`;
        }
    });

// 드래그 종료
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        }
    });

// 코드 불러오기
    const buttons = document.querySelectorAll('.load-code');
    const codeEditor = document.getElementById('codeEditor');
    const runCodeButton = document.getElementById('runCode');
    const runCodeBlankButton = document.getElementById('runCodeBlank');
    const resultFrame = document.getElementById('resultFrame');

// 외부 파일을 가져와 에디터에 삽입
    async function loadCodeFromFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error('코드를 불러올 수 없습니다.');
            codeEditor.value = await response.text(); // 에디터에 불러온 코드 삽입
        } catch (error) {
            alert(`오류 발생: ${error.message}`);
        }
    }

// 버튼 클릭 시 파일 경로에 따라 코드 로드
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const filePath = button.getAttribute('data-file'); // 파일 경로 가져오기
            loadCodeFromFile(filePath); // 코드 로드 함수 호출
        });
    });

// 실행 버튼 클릭 시 iframe에 코드 삽입
    runCodeButton.addEventListener('click', () => {
        const code = codeEditor.value;
        resultFrame.contentDocument.open();
        resultFrame.contentDocument.write(code);
        resultFrame.contentDocument.close();
    });

    runCodeBlankButton.addEventListener('click', () => {
        const code = codeEditor.value;
        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(code);
        newWindow.document.close();
    });
}