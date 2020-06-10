function data = process_dialogues(str)
%PROCESS_DIALOGUES process a txt file with dialogues about the multiplayer game

fileID = fopen(str,'r');
C = textscan(fileID,...
    '%d %s %s',...
    'Delimiter', ':');
fclose(fileID);

data = table(C{1},C{2},C{3},...
    'VariableNames', {'time' 'robot' 'message'});

end