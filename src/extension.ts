import * as vscode from "vscode";
//import * as path from "path";

//let globalContext: vscode.ExtensionContext;

/*
${config:rg-extens.rineginePath}\\
${config:rg-extens.rineginePath}\\other\\GLFW\\64\\include
${config:rg-extens.rineginePath}\\other\\FreeType\\64\\include\\freetype2
${config:rg-extens.rineginePath}\\other\\GLAD\\33\\include
${config:rg-extens.rineginePath}\\other\\stb_master 
${config:rg-extens.rineginePath}\\other\\OpenAL\\64\\include 
${config:rg-extens.rineginePath}\\other\\CURL\\64\\include
${config:rg-extens.rineginePath}\\compiler\\mingw64\\lib\\gcc\\x86_64-w64-mingw32\\13.2.0\\include\\c++
${config:rg-extens.rineginePath}\\compiler\\mingw64\\lib\\gcc\\x86_64-w64-mingw32\\13.2.0\\include\\c++\\x86_64-w64-mingw32
*/
async function updateIncludePath(rgpath = "") {
  const config = vscode.workspace.getConfiguration("C_Cpp");
  let includePaths = config.get<string[]>("default.includePath") || [];
  //let includePaths = rgpath;
  if(!rgpath){
    vscode.window.showInformationMessage(`Error Code 404`);
    return;
  }
  const rineginePath = "${config:rg-extens.rineginePath}";
  vscode.window.showInformationMessage(
    `Попытка добавить необходимые пути заголовочных фалов.`
  );

  // Получение настроек C/C++ расширения

  // Получаем текущий массив includePath

  // Путь, который нужно добавить

  // Проверяем, есть ли путь уже в настройках
  let countReady = 0;
  let paths = [
  rineginePath+'\\',
  rineginePath+'\\other\\GLFW\\64\\include',
  rineginePath+'\\other\\FreeType\\64\\include\\freetype2',
  rineginePath+'\\other\\GLAD\\33\\include',
  rineginePath+'\\other\\stb_master ',
  rineginePath+'\\other\\OpenAL\\64\\include ',
  rineginePath+'\\other\\CURL\\64\\include',
  rineginePath+'\\compiler\\mingw64\\lib\\gcc\\x86_64-w64-mingw32\\13.2.0\\include\\c++',
  rineginePath+'\\compiler\\mingw64\\lib\\gcc\\x86_64-w64-mingw32\\13.2.0\\include\\c++\\x86_64-w64-mingw32'];

  for(let i = 0; i<paths.length; i++){
    if (!includePaths.includes(paths[i]) ){
    includePaths.push(paths[i]);
    }else{countReady++;}
  }
  if(countReady == paths.length){
    vscode.window.showInformationMessage("Все пути уже были добавлены!");
    return;
  }else if(countReady == 0){
    vscode.window.showInformationMessage("Все необходимые пути добавлены!");
  }else if(countReady>0&&countReady<paths.length){
    vscode.window.showInformationMessage("Было добавлено "+(paths.length-countReady)+"/"+paths.length+" путей, остальные уже были добавлены.");
  }
    await config.update(
      "default.includePath",
      includePaths,
      vscode.ConfigurationTarget.Global
    );

    vscode.window.showInformationMessage(
      `Пути успешно настроенны!.`
    );
    
    // Обновляем настройку includePath
    
  
}

export function activate(context: vscode.ExtensionContext) {
  const rineginePath = vscode.workspace
    .getConfiguration("rg-extens")
    .get<string>("rineginePath");

  //globalContext = context;
  // Проверка на наличие пути к движку Rinegine при запуске расширения
  /*const rineginePath = vscode.workspace
    .getConfiguration("rg-extens")
    .get<string>("rineginePath");*/

  // Проверка пути при активации расширения
  if (!rineginePath || !isValidRineginePath(rineginePath)) {
    showRineginePathNotification(); // Показать уведомление о том, что путь не указан
  } else {
    updateIncludePath(rineginePath);
  }

  // Команда для ручного изменения пути к движку
  let setRineginePath = vscode.commands.registerCommand(
    "rg-extens.setRineginePath",
    async () => {
      await promptForRineginePath();
    }
  );

  // Функция для запуска сборки в терминале
  function runBuildCommand(command: string) {
    const terminal = vscode.window.createTerminal("RG Build"); // Создаём новый терминал
    terminal.show(); // Показываем терминал
    terminal.sendText(command); // Отправляем команду на выполнение
  }

  // Команда для сборки 64-битной версии движка
  let buildEngine64 = vscode.commands.registerCommand(
    "rg-extens.buildEngine",
    () => {
      const rineginePath = vscode.workspace
        .getConfiguration()
        .get("rg-extens.rineginePath") as string;
      if (rineginePath && isValidRineginePath(rineginePath)) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
          //const projectRoot = workspaceFolders[0].uri.fsPath;
          const buildCommand = `${rineginePath}\\bin\\rgcmd.exe`;
          const fullCommand = `"${buildCommand}"`; // Команда для 64-битной сборки
          runBuildCommand(`${buildCommand}`); // Выполняем команду в терминале из корня проекта
        } else {
          vscode.window.showErrorMessage("Проект не открыт.");
        }
      } else {
        showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
      }
    }
  );

  // Команда для сборки 32-битной версии движка
  let buildEngine32 = vscode.commands.registerCommand(
    "rg-extens.buildEngine32",
    () => {
      const rineginePath = vscode.workspace
        .getConfiguration()
        .get("rg-extens.rineginePath") as string;
      if (rineginePath && isValidRineginePath(rineginePath)) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders) {
          //const projectRoot = workspaceFolders[0].uri.fsPath;
          const buildCommand = `${rineginePath}\\bin\\rgcmd32.exe`;
          runBuildCommand(`${buildCommand}`); // Выполняем команду в терминале из корня проекта
        } else {
          vscode.window.showErrorMessage("Проект не открыт.");
        }
      } else {
        showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
      }
    }
  );
  let debugDeleteRinegineVariable = vscode.commands.registerCommand(
    "rg-extens.debugDeleteRinegineVariable",
    async () => {
      try {
        // Сбрасываем переменную rineginePath
        await vscode.workspace
          .getConfiguration("rg-extens")
          .update("rineginePath", undefined, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(
          "Переменная RineginePath успешно сброшена."
        );
      } catch (error) {
        vscode.window.showErrorMessage("Ошибка при сбросе пути Rinegine.");
      }
    }
  );

  context.subscriptions.push(setRineginePath);
  context.subscriptions.push(buildEngine64);
  context.subscriptions.push(buildEngine32);
  context.subscriptions.push(debugDeleteRinegineVariable);
}


function showRineginePathNotification() {
  // Вызываем всплывающее окно с предложением выбрать путь
  const message =
    'Путь до Rinegine не определен. Нажмите "Определить", чтобы выбрать путь.';
  vscode.window.showWarningMessage(message, "Определить").then((selection) => {
    if (selection === "Определить") {
      // Повторный вызов функции для запроса пути
      promptForRineginePath();
    }
  });
  updateIncludePath();
}

async function promptForRineginePath() {
  // Запрашиваем путь у пользователя
  const selectedFolder = await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    canSelectMany: false,
    openLabel: "Выберите папку Rinegine",
  });

  // Проверяем, что путь указан
  if (selectedFolder && selectedFolder[0]) {
    const manualPath = selectedFolder[0].fsPath;

    if (isValidRineginePath(manualPath)) {
      try {
        // Обновляем конфигурацию
        await vscode.workspace
          .getConfiguration("rg-extens")
          .update(
            "rineginePath",
            manualPath,
            vscode.ConfigurationTarget.Global
          );
        vscode.window.showInformationMessage(
          `Путь до Rinegine сохранен: ${manualPath}`
        );
        updateIncludePath("rineginePath");

      } catch (error) {
        // Обрабатываем ошибку сохранения
        if (error instanceof Error) {
          vscode.window.showErrorMessage(
            `Ошибка сохранения пути: ${error.message}`
          );
        } else {
          vscode.window.showErrorMessage(
            "Неизвестная ошибка при сохранении пути."
          );
        }
        // Если произошла ошибка, повторно показываем окно для выбора пути
        showRineginePathNotification();
      }
    } else {
      // Неверный путь, уведомление об ошибке
      vscode.window.showErrorMessage(
        "Указанный путь неверен. Путь должен заканчиваться на \\Rinegine\\ или \\Rinegine."
      );
      // Повторно показываем уведомление о необходимости выбора пути
      showRineginePathNotification();
    }
  } else {
    // Если путь не был указан, выводим ошибку и повторно вызываем уведомление
    vscode.window.showErrorMessage(
      "Путь не был указан. Пожалуйста, введите корректный путь."
    );
    showRineginePathNotification();
  }
}

// Проверка, что путь корректен (заканчивается на \Rinegine\ или \Rinegine)
function isValidRineginePath(rineginePath: string): boolean {
  return (
    rineginePath.endsWith("\\Rinegine") || rineginePath.endsWith("\\Rinegine\\")
  );
}
/*
function debugDeleteRinegineVariable() {
  let resetRineginePath = vscode.commands.registerCommand(
    "rg-extens.resetRineginePath",
    async () => {
      try {
        // Сбрасываем переменную rineginePath
        await vscode.workspace
          .getConfiguration("rg-extens")
          .update("rineginePath", undefined, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(
          "Переменная RineginePath успешно сброшена."
        );
      } catch (error) {
        vscode.window.showErrorMessage("Ошибка при сбросе пути Rinegine.");
      }
    }
  );
  
    globalContext.subscriptions.push(resetRineginePath);
  
}*/
export function deactivate() {}
