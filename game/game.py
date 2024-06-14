import sys
import numpy as np



BOARD_ROWS = 3
BOARD_COLUMNS = 3
board = np.zeros((BOARD_ROWS, BOARD_COLUMNS))


def mark_square(row, col, player):
    board[row][col] = player
    
    
def available_square(row, col):
    return board[row][col] == 0


def is_board_full(check_board=board):
    for row in range(BOARD_ROWS):
        for col in range(BOARD_COLUMNS):
            if check_board[row][col] == 0:
                return False
    return True


def check_win(player, check_board=board):
    for col in range(BOARD_COLUMNS):
        if check_board[0][col] == player and  check_board[1][col] == player and  check_board[2][col] == player:
            return True
    for row in range(BOARD_ROWS):
        if check_board[row][0] == player and  check_board[row][1] == player and  check_board[row][2] == player:
            return True
    if check_board[0][0] == player and  check_board[1][1] == player and  check_board[2][2] == player:
        return True
    if check_board[2][0] == player and  check_board[1][1] == player and  check_board[0][2] == player:
        return True
    return False


def minimax(minimax_board, depth, is_maximizing):
    if check_win(2, minimax_board):
        return float('inf')
    elif check_win(1, minimax_board):
        return float('-inf')
    elif is_board_full(minimax_board):
        return 0
    if is_maximizing:
        best_score = -1000
        for row in range(BOARD_ROWS):
            for col in range(BOARD_COLUMNS):
                if minimax_board[row][col] == 0:
                    minimax_board[row][col] = 2
                    score = minimax(minimax_board, depth + 1, is_maximizing = False)
                    minimax_board[row][col] = 0
                    best_score = max(score, best_score)
        return best_score
    else:
        best_score = 1000
        for row in range(BOARD_ROWS):
            for col in range(BOARD_COLUMNS):
                if minimax_board[row][col] == 0:
                    minimax_board[row][col] = 1
                    score = minimax(minimax_board, depth + 1, is_maximizing = True)
                    minimax_board[row][col] = 0
                    best_score = min(score, best_score)    
    return best_score


def best_move():
    best_score = -1000
    move = (-1, -1)
    for row in range (BOARD_ROWS):
        for col in range(BOARD_COLUMNS):
            if board[row][col] == 0:
                board[row][col] = 2
                score = minimax(board, 0, False)
                board[row][col] = 0
                if score > best_score:
                    best_score = score
                    move = (row, col)
    if move != (-1, -1):
        mark_square(move[0], move[1], 2)
        next_move = (move[0], move[1])
        return next_move
    return False


def show_matrix(board):
    print(board)
    return None



def run(mouseX, mouseY):
    game_over = False
    player = 1

    if available_square(mouseY, mouseX):
        mark_square(mouseY, mouseX, player)
        if check_win(player):
            game_over = True
        player = player % 2 + 1
        if not game_over:
            if best_move():
                if check_win(2):
                    game_over = True
                player = player % 2 + 1
        if not game_over:
            if is_board_full():
                game_over = True
    if not game_over:
        print('continue play')
        print(board)
    else:
        if check_win(1):
            print("1 won")
            print(board)
            return "finished"
        elif check_win(2):
            print("2 won")
            print(board)
            return"finished"
        else:
            print("none won")
            print(board)
            return "finished"
    return "not-finished"

            
if __name__ == "__main__":

    while True:
        chosen = input("please input your choise: \nx(0-2 horisontal) and y (0-2 vertical) comma separated: ")
        mouseX = int(chosen.split(",")[0])
        mouseY = int(chosen.split(",")[-1])
        status = run(mouseX, mouseY)
        if status == "finished":
            break
