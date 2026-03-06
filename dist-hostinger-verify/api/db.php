<?php
declare(strict_types=1);

function json_response(int $statusCode, array $payload): never
{
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function read_request_payload(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($contentType, 'application/json') === false) {
        return $_POST;
    }

    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        return [];
    }

    return $decoded;
}

function db(): mysqli
{
    static $connection = null;
    if ($connection instanceof mysqli) {
        return $connection;
    }

    $configPath = __DIR__ . '/config.php';
    if (!is_file($configPath)) {
        json_response(500, [
            'success' => false,
            'error' => 'Missing api/config.php. Copy api/config.example.php to api/config.php and set credentials.',
        ]);
    }

    /** @var array<string,mixed> $config */
    $config = require $configPath;

    $host = (string)($config['host'] ?? '127.0.0.1');
    $port = (int)($config['port'] ?? 3306);
    $username = (string)($config['username'] ?? '');
    $password = (string)($config['password'] ?? '');
    $database = (string)($config['database'] ?? '');
    $charset = (string)($config['charset'] ?? 'utf8mb4');

    $connection = @new mysqli($host, $username, $password, $database, $port);
    if ($connection->connect_errno) {
        json_response(500, [
            'success' => false,
            'error' => 'Database connection failed.',
            'details' => $connection->connect_error,
        ]);
    }

    if (!$connection->set_charset($charset)) {
        json_response(500, [
            'success' => false,
            'error' => 'Could not set database charset.',
            'details' => $connection->error,
        ]);
    }

    return $connection;
}
