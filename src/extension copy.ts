import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    // Проверка на наличие пути к движку Rinegine при запуске расширения
		const rineginePath = vscode.workspace.getConfiguration('rg-extens').get<string>('rineginePath');

    // Проверка пути при активации расширения
    if (!rineginePath || !isValidRineginePath(rineginePath)) {
        showRineginePathNotification(); // Показать уведомление о том, что путь не указан
    }

		
    checkRineginePath();

    // Команда для ручного изменения пути к движку
    let setRineginePath = vscode.commands.registerCommand('rg-extens.setRineginePath', async () => {
        await promptForRineginePath();
    });

    // Команда для сборки 64-битной версии движка
    /*

    // Команда для сборки 32-битной версии движка с горячей клавишей
    let buildEngine32 = vscode.commands.registerCommand('rg-extens.buildEngine32', () => {
        const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;
        if (rineginePath && isValidRineginePath(rineginePath)) {
            cp.exec(`${rineginePath}\\bin\\rgcmd32.exe`, (err, stdout, stderr) => {
                if (err) {
                    vscode.window.showErrorMessage(`Ошибка: ${stderr}`);
                    return;
                }
                vscode.window.showInformationMessage(`Результат сборки: ${stdout}`);
            });
        } else {
            showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
        }
    });*/
		/*let buildEngine64 = vscode.commands.registerCommand('rg-extens.buildEngine', () => {
			const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;
			if (rineginePath && isValidRineginePath(rineginePath)) {
					cp.exec(`${rineginePath}\\bin\\rgcmd.exe`, (err, stdout, stderr) => {
							if (err) {
									vscode.window.showErrorMessage(`Ошибка: ${stderr}`);
									return;
							}
							vscode.window.showInformationMessage(`Результат сборки: ${stdout}`);
					});
			} else {
					showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
			}
	});* /
		let buildEngine64 = vscode.commands.registerCommand('rg-extens.buildEngine', () => {
			const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;
			if (rineginePath && isValidRineginePath(rineginePath)) {
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (workspaceFolders) {
							const projectRoot = workspaceFolders[0].uri.fsPath;
							cp.exec(`${rineginePath}\\bin\\rgcmd.exe`, { cwd: projectRoot }, (err, stdout, stderr) => {
									if (err) {
											vscode.window.showErrorMessage(`Ошибка: ${stderr}`);
											vscode.window.showErrorMessage(`Выход: ${stdout}`);
											vscode.window.showErrorMessage(`Значеие err: ${err}`);
											return;
									}
									vscode.window.showInformationMessage(`Результат сборки (64-bit): ${stdout}`);
							});
					} else {
							vscode.window.showErrorMessage('Проект не открыт.');
					}
			} else {
					showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
			}
	});

	// Команда для сборки 32-битной версии движка
	let buildEngine32 = vscode.commands.registerCommand('rg-extens.buildEngine32', () => {
			const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;
			if (rineginePath && isValidRineginePath(rineginePath)) {
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (workspaceFolders) {
							const projectRoot = workspaceFolders[0].uri.fsPath;
							cp.exec(`${rineginePath}\\bin\\rgcmd32.exe`, { cwd: projectRoot }, (err, stdout, stderr) => {
									if (err) {
											vscode.window.showErrorMessage(`Ошибка: ${stderr}`);
											vscode.window.showErrorMessage(`Выход: ${stdout}`);
											vscode.window.showErrorMessage(`Значеие err: ${err}`);
											return;
									}
									vscode.window.showInformationMessage(`Результат сборки (32-bit): ${stdout}`);
							});
					} else {
							vscode.window.showErrorMessage('Проект не открыт.');
					}
			} else {
					showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
			}
	});*/

		// Функция для запуска сборки в терминале
		function runBuildCommand(command: string) {
			const terminal = vscode.window.createTerminal('RG Build'); // Создаём новый терминал
			terminal.show(); // Показываем терминал
			terminal.sendText(command); // Отправляем команду на выполнение
	}

	// Команда для сборки 64-битной версии движка
	let buildEngine64 = vscode.commands.registerCommand('rg-extens.buildEngine', () => {
			const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;
			if (rineginePath && isValidRineginePath(rineginePath)) {
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (workspaceFolders) {
							//const projectRoot = workspaceFolders[0].uri.fsPath;
							const buildCommand = `${rineginePath}\\bin\\rgcmd.exe`;
							const fullCommand = `"${buildCommand}"`; // Команда для 64-битной сборки
							runBuildCommand(`${buildCommand}`); // Выполняем команду в терминале из корня проекта
					} else {
							vscode.window.showErrorMessage('Проект не открыт.');
					}
			} else {
					showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
			}
	});

	// Команда для сборки 32-битной версии движка
	let buildEngine32 = vscode.commands.registerCommand('rg-extens.buildEngine32', () => {
			const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;
			if (rineginePath && isValidRineginePath(rineginePath)) {
					const workspaceFolders = vscode.workspace.workspaceFolders;
					if (workspaceFolders) {
							//const projectRoot = workspaceFolders[0].uri.fsPath;
							const buildCommand = `${rineginePath}\\bin\\rgcmd32.exe`;
							runBuildCommand(`${buildCommand}`); // Выполняем команду в терминале из корня проекта
					} else {
							vscode.window.showErrorMessage('Проект не открыт.');
					}
			} else {
					showRineginePathNotification(); // Показать уведомление, если путь не установлен или некорректен
			}
	});

    context.subscriptions.push(setRineginePath);
    context.subscriptions.push(buildEngine64);
    context.subscriptions.push(buildEngine32);
}

// Функция для проверки пути к движку при запуске
function checkRineginePath() {
    const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;

    if (!rineginePath || !isValidRineginePath(rineginePath)) {
        showRineginePathNotification(); // Показать назойливое уведомление, если путь не установлен
    }
}

// Функция для показа назойливого уведомления
/*function showRineginePathNotification() {
    const notification = vscode.window.showErrorMessage('Путь до Rinegine не определён или указан неверно. Укажите путь до движка.', 'Определить');

    notification.then(async (selection) => {
        if (selection === 'Определить') {
            await promptForRineginePath();
        }

        const rineginePath = vscode.workspace.getConfiguration().get('rg-extens.rineginePath') as string;
        if (!isValidRineginePath(rineginePath)) {
            showRineginePathNotification(); // Если путь всё ещё неверен, показать уведомление снова
        }
    });
}*/
function showRineginePathNotification() {
	// Вызываем всплывающее окно с предложением выбрать путь
	const message = 'Путь до Rinegine не определен. Нажмите "Определить", чтобы выбрать путь.';
	vscode.window.showWarningMessage(message, 'Определить').then((selection) => {
		if (selection === 'Определить') {
			// Повторный вызов функции для запроса пути
			promptForRineginePath();
		}
	});
}
// Функция для запроса пути к движку через проводник
/*async function promptForRineginePath() {
    const selectedFolder = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        canSelectMany: false,
        openLabel: 'Выберите папку Rinegine',
    });

    if (selectedFolder && selectedFolder[0]) {
        const rineginePath = selectedFolder[0].fsPath;
        if (isValidRineginePath(rineginePath)) {
            await vscode.workspace.getConfiguration().update('rg-extens.rineginePath', rineginePath, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`Путь до Rinegine сохранен: ${rineginePath}`);
        } else {
            vscode.window.showErrorMessage('Выбранный путь должен заканчиваться на \\Rinegine\\ или \\Rinegine.');
            showRineginePathNotification(); // Показать уведомление заново
        }
    } else {
        const manualPath = await vscode.window.showInputBox({
            prompt: "Введите путь до движка Rinegine (должен заканчиваться на \\Rinegine\\ или \\Rinegine)",
            value: process.env['RINEGINE'] || ''
        });

        if (manualPath && isValidRineginePath(manualPath)) {
            await vscode.workspace.getConfiguration().update('rg-extens.rineginePath', manualPath, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`Путь до Rinegine сохранен: ${manualPath}`);
        } else {
            vscode.window.showErrorMessage('Указанный путь неверен. Путь должен заканчиваться на \\Rinegine\\ или \\Rinegine.');
            showRineginePathNotification(); // Показать уведомление заново
        }
    }
}*/
/*
async function promptForRineginePath() {
	// Запрашиваем путь у пользователя
	const selectedFolder = await vscode.window.showOpenDialog({
		canSelectFolders: true,
		canSelectFiles: false,
		canSelectMany: false,
		openLabel: 'Выберите папку Rinegine',
});

	// Проверяем, что путь указан
		if (selectedFolder&&selectedFolder[0]) {
      const manualPath = selectedFolder[0].fsPath;
				if (isValidRineginePath(manualPath)) {
					try {
							// Обновляем конфигурацию
							await vscode.workspace.getConfiguration('rg-extens').update('rineginePath', manualPath, vscode.ConfigurationTarget.Global);
							vscode.window.showInformationMessage(`Путь до Rinegine сохранен: ${manualPath}`);
					} catch (error) {
							if (error instanceof Error) {
									vscode.window.showErrorMessage(`Ошибка сохранения пути: ${error.message}`);
							} else {
									vscode.window.showErrorMessage('Неизвестная ошибка при сохранении пути.');
							}
					}
			} else {
					vscode.window.showErrorMessage('Указанный путь неверен. Путь должен заканчиваться на \\Rinegine\\ или \\Rinegine.');
					showRineginePathNotification(); // Показать уведомление заново
			}
	} else {
			vscode.window.showErrorMessage('Путь не был указан. Пожалуйста, введите корректный путь.');
			showRineginePathNotification(); // Показать уведомление заново
	}
}*/

async function promptForRineginePath() {
	// Запрашиваем путь у пользователя
	const selectedFolder = await vscode.window.showOpenDialog({
		canSelectFolders: true,
		canSelectFiles: false,
		canSelectMany: false,
		openLabel: 'Выберите папку Rinegine',
	});

	// Проверяем, что путь указан
	if (selectedFolder && selectedFolder[0]) {
		const manualPath = selectedFolder[0].fsPath;

		if (isValidRineginePath(manualPath)) {
			try {
				// Обновляем конфигурацию
				await vscode.workspace.getConfiguration('rg-extens').update('rineginePath', manualPath, vscode.ConfigurationTarget.Global);
				vscode.window.showInformationMessage(`Путь до Rinegine сохранен: ${manualPath}`);
			} catch (error) {
				// Обрабатываем ошибку сохранения
				if (error instanceof Error) {
					vscode.window.showErrorMessage(`Ошибка сохранения пути: ${error.message}`);
				} else {
					vscode.window.showErrorMessage('Неизвестная ошибка при сохранении пути.');
				}
				// Если произошла ошибка, повторно показываем окно для выбора пути
				showRineginePathNotification();
			}
		} else {
			// Неверный путь, уведомление об ошибке
			vscode.window.showErrorMessage('Указанный путь неверен. Путь должен заканчиваться на \\Rinegine\\ или \\Rinegine.');
			// Повторно показываем уведомление о необходимости выбора пути
			showRineginePathNotification();
		}
	} else {
		// Если путь не был указан, выводим ошибку и повторно вызываем уведомление
		vscode.window.showErrorMessage('Путь не был указан. Пожалуйста, введите корректный путь.');
		showRineginePathNotification();
	}
}


// Проверка, что путь корректен (заканчивается на \Rinegine\ или \Rinegine)
function isValidRineginePath(rineginePath: string): boolean {
    return rineginePath.endsWith('\\Rinegine') || rineginePath.endsWith('\\Rinegine\\');
}

export function deactivate() {}
