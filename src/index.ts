#!/usr/bin/env node
/**
 * MCP Server generated from OpenAPI spec for midaz-ledger v1.0.0
 * Generated on: 2025-10-22T15:00:01.032Z
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest
} from "@modelcontextprotocol/sdk/types.js";
import { setupStreamableHttpServer } from "./streamable-http.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

/**
 * Type definition for JSON objects
 */
type JsonObject = Record<string, any>;

/**
 * Interface for MCP Tool Definition
 */
interface McpToolDefinition {
    name: string;
    description: string;
    inputSchema: any;
    method: string;
    pathTemplate: string;
    executionParameters: { name: string, in: string }[];
    requestBodyContentType?: string;
    securityRequirements: any[];
}

/**
 * Server configuration
 */
export const SERVER_NAME = "midaz-ledger";
export const SERVER_VERSION = "1.0.0";
export const API_BASE_URL = "localhost";

/**
 * MCP Server instance
 */
const server = new Server(
    { name: SERVER_NAME, version: SERVER_VERSION },
    { capabilities: { tools: {} } }
);

/**
 * Map of tool definitions by name
 */
const toolDefinitionMap: Map<string, McpToolDefinition> = new Map([

  ["GetV1OrganizationsLedgersAccountsAliasBalances", {
    name: "GetV1OrganizationsLedgersAccountsAliasBalances",
    description: `Get Balances with alias`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"alias":{"type":"string","description":"Alias (e.g. @person1)"}},"required":["Authorization","organization_id","ledger_id","alias"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/accounts/alias/{alias}/balances",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"alias","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersAccountsExternalBalances", {
    name: "GetV1OrganizationsLedgersAccountsExternalBalances",
    description: `Get External balances with code`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"code":{"type":"string","description":"Code (e.g. BRL)"}},"required":["Authorization","organization_id","ledger_id","code"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/accounts/external/{code}/balances",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"code","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersAccountsBalances", {
    name: "GetV1OrganizationsLedgersAccountsBalances",
    description: `Get all balances by account id`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"account_id":{"type":"string","description":"Account ID"},"limit":{"default":10,"type":"number","description":"Limit"},"start_date":{"type":"string","description":"Start Date"},"end_date":{"type":"string","description":"End Date"},"sort_order":{"type":"string","description":"Sort Order"},"cursor":{"type":"string","description":"Cursor"}},"required":["Authorization","organization_id","ledger_id","account_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/accounts/{account_id}/balances",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"account_id","in":"path"},{"name":"limit","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"sort_order","in":"query"},{"name":"cursor","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersAccountsOperations", {
    name: "GetV1OrganizationsLedgersAccountsOperations",
    description: `Get all Operations with the input ID`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"account_id":{"type":"string","description":"Account ID"},"limit":{"default":10,"type":"number","description":"Limit"},"start_date":{"type":"string","description":"Start Date"},"end_date":{"type":"string","description":"End Date"},"sort_order":{"type":"string","description":"Sort Order"},"cursor":{"type":"string","description":"Cursor"},"type":{"type":"string","description":"DEBIT, CREDIT"}},"required":["Authorization","organization_id","ledger_id","account_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/accounts/{account_id}/operations",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"account_id","in":"path"},{"name":"limit","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"sort_order","in":"query"},{"name":"cursor","in":"query"},{"name":"type","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersAccountsOperationsByOperationId", {
    name: "GetV1OrganizationsLedgersAccountsOperationsByOperationId",
    description: `Get an Operation with the input ID`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"account_id":{"type":"string","description":"Account ID"},"operation_id":{"type":"string","description":"Operation ID"}},"required":["Authorization","organization_id","ledger_id","account_id","operation_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/accounts/{account_id}/operations/{operation_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"account_id","in":"path"},{"name":"operation_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PutV1OrganizationsLedgersAssetRates", {
    name: "PutV1OrganizationsLedgersAssetRates",
    description: `Create or Update an AssetRate with the input details`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"requestBody":{"description":"AssetRate Input","properties":{"externalId":{"description":"External identifier for integration (optional)\nexample: 00000000-0000-0000-0000-000000000000\nformat: uuid","format":"uuid","type":"string"},"from":{"description":"Source asset code (required)\nexample: USD\nrequired: true\nminLength: 2\nmaxLength: 10","maxLength":10,"minLength":2,"type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional custom attributes (optional)\nexample: {\"provider\": \"Central Bank\", \"rateName\": \"Official Exchange Rate\"}","type":"object"},"rate":{"description":"Conversion rate value (required)\nexample: 100\nrequired: true","type":"number"},"scale":{"description":"Decimal places for the rate (optional)\nexample: 2\nminimum: 0","minimum":0,"type":"number"},"source":{"description":"Source of rate information (optional)\nexample: External System\nmaxLength: 200","maxLength":200,"type":"string"},"to":{"description":"Target asset code (required)\nexample: BRL\nrequired: true\nminLength: 2\nmaxLength: 10","maxLength":10,"minLength":2,"type":"string"},"ttl":{"description":"Time-to-live in seconds (optional)\nexample: 3600\nminimum: 0","minimum":0,"type":"number"}},"required":["from","rate","to"],"type":"object"}},"required":["Authorization","organization_id","ledger_id","requestBody"]},
    method: "put",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/asset-rates",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersAssetRatesFromByAssetCode", {
    name: "GetV1OrganizationsLedgersAssetRatesFromByAssetCode",
    description: `Get an AssetRate by the Asset Code with the input details`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"asset_code":{"type":"string","description":"From Asset Code"},"to":{"items":{"type":"string"},"type":"array","description":"To Asset Codes"},"limit":{"default":10,"type":"number","description":"Limit"},"start_date":{"type":"string","description":"Start Date"},"end_date":{"type":"string","description":"End Date"},"sort_order":{"enum":["asc","desc"],"type":"string","description":"Sort Order"},"cursor":{"type":"string","description":"Cursor"}},"required":["Authorization","organization_id","ledger_id","asset_code"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/asset-rates/from/{asset_code}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"asset_code","in":"path"},{"name":"to","in":"query"},{"name":"limit","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"sort_order","in":"query"},{"name":"cursor","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersAssetRatesByExternalId", {
    name: "GetV1OrganizationsLedgersAssetRatesByExternalId",
    description: `Get an AssetRate by External ID with the input details`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"external_id":{"type":"string","description":"External ID"}},"required":["Authorization","organization_id","ledger_id","external_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/asset-rates/{external_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"external_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersBalances", {
    name: "GetV1OrganizationsLedgersBalances",
    description: `Get all balances`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"limit":{"default":10,"type":"number","description":"Limit"},"start_date":{"type":"string","description":"Start Date"},"end_date":{"type":"string","description":"End Date"},"sort_order":{"type":"string","description":"Sort Order"},"cursor":{"type":"string","description":"Cursor"}},"required":["Authorization","organization_id","ledger_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/balances",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"limit","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"sort_order","in":"query"},{"name":"cursor","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersBalancesByBalanceId", {
    name: "GetV1OrganizationsLedgersBalancesByBalanceId",
    description: `Get a Balance with the input ID`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"balance_id":{"type":"string","description":"Balance ID"}},"required":["Authorization","organization_id","ledger_id","balance_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/balances/{balance_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"balance_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["DeleteV1OrganizationsLedgersBalancesByBalanceId", {
    name: "DeleteV1OrganizationsLedgersBalancesByBalanceId",
    description: `Delete a Balance with the input ID`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"balance_id":{"type":"string","description":"Balance ID"}},"required":["Authorization","organization_id","ledger_id","balance_id"]},
    method: "delete",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/balances/{balance_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"balance_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PatchV1OrganizationsLedgersBalancesByBalanceId", {
    name: "PatchV1OrganizationsLedgersBalancesByBalanceId",
    description: `Update a Balance with the input payload`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"balance_id":{"type":"string","description":"Balance ID"},"requestBody":{"description":"Balance Input","properties":{"allowReceiving":{"description":"Whether the account should be allowed to receive funds to this balance\nrequired: false\nexample: true","type":"boolean"},"allowSending":{"description":"Whether the account should be allowed to send funds from this balance\nrequired: false\nexample: true","type":"boolean"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","balance_id","requestBody"]},
    method: "patch",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/balances/{balance_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"balance_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersOperationRoutes", {
    name: "GetV1OrganizationsLedgersOperationRoutes",
    description: `Returns a list of all operation routes within the specified ledger with cursor-based pagination`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"limit":{"default":10,"type":"number","description":"Limit"},"start_date":{"type":"string","description":"Start Date"},"end_date":{"type":"string","description":"End Date"},"sort_order":{"enum":["asc","desc"],"type":"string","description":"Sort Order"},"cursor":{"type":"string","description":"Cursor"}},"required":["Authorization","organization_id","ledger_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/operation-routes",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"limit","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"sort_order","in":"query"},{"name":"cursor","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersOperationRoutes", {
    name: "PostV1OrganizationsLedgersOperationRoutes",
    description: `Endpoint to create a new Operation Route.`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"requestBody":{"type":"object","description":"Operation Route Input"}},"required":["Authorization","organization_id","ledger_id","requestBody"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/operation-routes",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersOperationRoutesById", {
    name: "GetV1OrganizationsLedgersOperationRoutesById",
    description: `Returns detailed information about an operation route identified by its UUID within the specified ledger`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"id":{"type":"string","description":"Operation Route ID in UUID format"}},"required":["Authorization","organization_id","ledger_id","id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/operation-routes/{id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["DeleteV1OrganizationsLedgersOperationRoutesByOperationRouteId", {
    name: "DeleteV1OrganizationsLedgersOperationRoutesByOperationRouteId",
    description: `Deletes an existing operation route identified by its UUID within the specified ledger`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"operation_route_id":{"type":"string","description":"Operation Route ID in UUID format"}},"required":["Authorization","organization_id","ledger_id","operation_route_id"]},
    method: "delete",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/operation-routes/{operation_route_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"operation_route_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PatchV1OrganizationsLedgersOperationRoutesByOperationRouteId", {
    name: "PatchV1OrganizationsLedgersOperationRoutesByOperationRouteId",
    description: `Updates an existing operation route's properties such as title, description, and type within the specified ledger`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"operation_route_id":{"type":"string","description":"Operation Route ID in UUID format"},"requestBody":{"description":"Operation Route Input","properties":{"account":{"allOf":[{"type":"object"}],"description":"The account selection rule configuration.","type":"object"},"description":{"description":"Detailed description of the operation route purpose and usage.","maxLength":250,"type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional metadata stored as JSON","type":"object"},"title":{"description":"Short text summarizing the purpose of the operation. Used as an entry note for identification.","maxLength":50,"type":"string"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","operation_route_id","requestBody"]},
    method: "patch",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/operation-routes/{operation_route_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"operation_route_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersTransactionRoutes", {
    name: "GetV1OrganizationsLedgersTransactionRoutes",
    description: `Endpoint to get all Transaction Routes with optional metadata filtering.`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"limit":{"default":10,"type":"number","description":"Limit"},"start_date":{"type":"string","description":"Start Date"},"end_date":{"type":"string","description":"End Date"},"sort_order":{"enum":["asc","desc"],"type":"string","description":"Sort Order"},"cursor":{"type":"string","description":"Cursor"}},"required":["Authorization","organization_id","ledger_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transaction-routes",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"limit","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"sort_order","in":"query"},{"name":"cursor","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionRoutes", {
    name: "PostV1OrganizationsLedgersTransactionRoutes",
    description: `Endpoint to create a new Transaction Route.`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"requestBody":{"description":"Transaction Route Input","properties":{"description":{"description":"A description for the Transaction Route.","maxLength":250,"type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional metadata stored as JSON","type":"object"},"operationRoutes":{"description":"An object containing accounting data of Operation Routes from the Transaction Route.","items":{"type":"string"},"type":"array"},"title":{"description":"Short text summarizing the purpose of the transaction. Used as an entry note for identification.","maxLength":50,"type":"string"}},"required":["operationRoutes","title"],"type":"object"}},"required":["Authorization","organization_id","ledger_id","requestBody"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transaction-routes",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersTransactionRoutesByTransactionRouteId", {
    name: "GetV1OrganizationsLedgersTransactionRoutesByTransactionRouteId",
    description: `Endpoint to get a Transaction Route by its ID.`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"transaction_route_id":{"type":"string","description":"Transaction Route ID in UUID format"}},"required":["Authorization","organization_id","ledger_id","transaction_route_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transaction-routes/{transaction_route_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_route_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["DeleteV1OrganizationsLedgersTransactionRoutesByTransactionRouteId", {
    name: "DeleteV1OrganizationsLedgersTransactionRoutesByTransactionRouteId",
    description: `Endpoint to delete a Transaction Route by its ID.`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"transaction_route_id":{"type":"string","description":"Transaction Route ID in UUID format"}},"required":["Authorization","organization_id","ledger_id","transaction_route_id"]},
    method: "delete",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transaction-routes/{transaction_route_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_route_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PatchV1OrganizationsLedgersTransactionRoutesByTransactionRouteId", {
    name: "PatchV1OrganizationsLedgersTransactionRoutesByTransactionRouteId",
    description: `Endpoint to update a Transaction Route by its ID.`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token with format: Bearer {token}"},"X-Request-Id":{"type":"string","description":"Request ID for tracing"},"organization_id":{"type":"string","description":"Organization ID in UUID format"},"ledger_id":{"type":"string","description":"Ledger ID in UUID format"},"transaction_route_id":{"type":"string","description":"Transaction Route ID in UUID format"},"requestBody":{"description":"Transaction Route Input","properties":{"description":{"description":"A description for the Transaction Route.","maxLength":250,"type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional metadata stored as JSON","type":"object"},"operationRoutes":{"description":"An object containing accounting data of Operation Routes from the Transaction Route.","items":{"type":"string"},"type":"array"},"title":{"description":"Short text summarizing the purpose of the transaction. Used as an entry note for identification.","maxLength":50,"type":"string"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","transaction_route_id","requestBody"]},
    method: "patch",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transaction-routes/{transaction_route_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_route_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersTransactions", {
    name: "GetV1OrganizationsLedgersTransactions",
    description: `Get all Transactions with the input metadata or without metadata`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"limit":{"default":10,"type":"number","description":"Limit"},"start_date":{"type":"string","description":"Start Date"},"end_date":{"type":"string","description":"End Date"},"sort_order":{"enum":["asc","desc"],"type":"string","description":"Sort Order"},"cursor":{"type":"string","description":"Cursor"}},"required":["Authorization","organization_id","ledger_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"limit","in":"query"},{"name":"start_date","in":"query"},{"name":"end_date","in":"query"},{"name":"sort_order","in":"query"},{"name":"cursor","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionsDsl", {
    name: "PostV1OrganizationsLedgersTransactionsDsl",
    description: `Create a Transaction with the input DSL file`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"requestBody":{"type":"string","description":"Request body (content type: multipart/form-data)"}},"required":["Authorization","organization_id","ledger_id","requestBody"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/dsl",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"}],
    requestBodyContentType: "multipart/form-data",
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionsInflow", {
    name: "PostV1OrganizationsLedgersTransactionsInflow",
    description: `Create a Transaction with the input payload`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"requestBody":{"description":"Transaction Input","properties":{"chartOfAccountsGroupName":{"description":"Chart of accounts group name for accounting purposes\nexample: FUNDING\nmaxLength: 256","type":"string"},"code":{"description":"Transaction code for reference\nexample: TR12345\nmaxLength: 100","type":"string"},"description":{"description":"Human-readable description of the transaction\nexample: New Inflow Transaction\nmaxLength: 256","type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional custom attributes\nexample: {\"reference\": \"TRANSACTION-001\", \"source\": \"api\"}","type":"object"},"send":{"description":"Send operation details including distribution only\nrequired: true","properties":{"asset":{"description":"Asset code for the transaction\nexample: USD\nrequired: true","type":"string"},"distribute":{"description":"Destination accounts and amounts for the transaction\nrequired: true","properties":{"to":{"description":"List of destination operations\nrequired: true","items":{"properties":{"accountAlias":{"description":"Account identifier or alias\nexample: {{accountAlias}}\nrequired: true","type":"string"},"amount":{"description":"Amount details for the operation\nrequired: true","properties":{"asset":{"description":"Asset code\nexample: USD\nrequired: true","type":"string"},"value":{"description":"Amount value in smallest unit\nexample: \"100.00\"\nrequired: true","type":"string"}},"type":"object"},"chartOfAccounts":{"description":"Chart of accounts code\nexample: FUNDING_CREDIT","type":"string"},"description":{"description":"Operation description\nexample: Credit Operation","type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional metadata\nexample: {\"operation\": \"funding\", \"type\": \"account\"}","type":"object"}},"type":"object"},"type":"array"}},"type":"object"},"value":{"description":"Transaction amount value in the smallest unit of the asset\nexample: \"100.00\"\nrequired: true","type":"string"}},"type":"object"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","requestBody"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/inflow",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionsJson", {
    name: "PostV1OrganizationsLedgersTransactionsJson",
    description: `Create a Transaction with the input payload`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"requestBody":{"description":"Transaction Input","properties":{"chartOfAccountsGroupName":{"description":"Chart of accounts group name for accounting purposes\nexample: FUNDING\nmaxLength: 256","type":"string"},"code":{"description":"Transaction code for reference\nexample: TR12345\nmaxLength: 100","type":"string"},"description":{"description":"Human-readable description of the transaction\nexample: New Transaction\nmaxLength: 256","type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional custom attributes\nexample: {\"reference\": \"TRANSACTION-001\", \"source\": \"api\"}","type":"object"},"pending":{"default":false,"description":"Whether the transaction should be created in pending state\nexample: true\nswagger: type boolean","type":"boolean"},"send":{"description":"Send operation details including source and distribution\nrequired: true","properties":{"asset":{"description":"Asset code for the transaction\nexample: USD\nrequired: true","type":"string"},"distribute":{"description":"Destination accounts and amounts for the transaction\nrequired: true","properties":{"to":{"description":"List of destination operations\nrequired: true","items":{"properties":{"accountAlias":{"description":"Account identifier or alias\nexample: {{accountAlias}}\nrequired: true","type":"string"},"amount":{"description":"Amount details for the operation\nrequired: true","properties":{"asset":{"description":"Asset code\nexample: USD\nrequired: true","type":"string"},"value":{"description":"Amount value in smallest unit\nexample: \"100.00\"\nrequired: true","type":"string"}},"type":"object"},"chartOfAccounts":{"description":"Chart of accounts code\nexample: FUNDING_CREDIT","type":"string"},"description":{"description":"Operation description\nexample: Credit Operation","type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional metadata\nexample: {\"operation\": \"funding\", \"type\": \"account\"}","type":"object"}},"type":"object"},"type":"array"}},"type":"object"},"source":{"description":"Source accounts and amounts for the transaction\nrequired: true","properties":{"from":{"description":"List of source operations\nrequired: true","items":{"properties":{"accountAlias":{"description":"Account identifier or alias\nexample: @external/USD\nrequired: true","type":"string"},"amount":{"description":"Amount details for the operation\nrequired: true","properties":{"asset":{"description":"Asset code\nexample: USD\nrequired: true","type":"string"},"value":{"description":"Amount value in smallest unit\nexample: \"100.00\"\nrequired: true","type":"string"}},"type":"object"},"chartOfAccounts":{"description":"Chart of accounts code\nexample: FUNDING_DEBIT","type":"string"},"description":{"description":"Operation description\nexample: Debit Operation","type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional metadata\nexample: {\"operation\": \"funding\", \"type\": \"external\"}","type":"object"}},"type":"object"},"type":"array"}},"type":"object"},"value":{"description":"Transaction amount value in the smallest unit of the asset\nexample: \"100.00\"\nrequired: true","type":"string"}},"type":"object"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","requestBody"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/json",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionsOutflow", {
    name: "PostV1OrganizationsLedgersTransactionsOutflow",
    description: `Create a Transaction with the input payload`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"requestBody":{"description":"Transaction Input","properties":{"chartOfAccountsGroupName":{"description":"Chart of accounts group name for accounting purposes\nexample: WITHDRAWAL\nmaxLength: 256","type":"string"},"code":{"description":"Transaction code for reference\nexample: TR12345\nmaxLength: 100","type":"string"},"description":{"description":"Human-readable description of the transaction\nexample: New Outflow Transaction\nmaxLength: 256","type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional custom attributes\nexample: {\"reference\": \"TRANSACTION-001\", \"source\": \"api\"}","type":"object"},"pending":{"default":false,"description":"Whether the transaction should be created in pending state\nexample: true\nswagger: type boolean","type":"boolean"},"send":{"description":"Send operation details including source only\nrequired: true","properties":{"asset":{"description":"Asset code for the transaction\nexample: USD\nrequired: true","type":"string"},"source":{"description":"Source accounts and amounts for the transaction\nrequired: true","properties":{"from":{"description":"List of source operations\nrequired: true","items":{"properties":{"accountAlias":{"description":"Account identifier or alias\nexample: {{accountAlias}}\nrequired: true","type":"string"},"amount":{"description":"Amount details for the operation\nrequired: true","properties":{"asset":{"description":"Asset code\nexample: USD\nrequired: true","type":"string"},"value":{"description":"Amount value in smallest unit\nexample: \"100.00\"\nrequired: true","type":"string"}},"type":"object"},"chartOfAccounts":{"description":"Chart of accounts code\nexample: WITHDRAWAL_DEBIT","type":"string"},"description":{"description":"Operation description\nexample: Debit Operation","type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional metadata\nexample: {\"operation\": \"withdrawal\", \"type\": \"account\"}","type":"object"}},"type":"object"},"type":"array"}},"type":"object"},"value":{"description":"Transaction amount value in the smallest unit of the asset\nexample: \"100.00\"\nrequired: true","type":"string"}},"type":"object"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","requestBody"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/outflow",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["GetV1OrganizationsLedgersTransactionsByTransactionId", {
    name: "GetV1OrganizationsLedgersTransactionsByTransactionId",
    description: `Get a Transaction with the input ID`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"transaction_id":{"type":"string","description":"Transaction ID"}},"required":["Authorization","organization_id","ledger_id","transaction_id"]},
    method: "get",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/{transaction_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PatchV1OrganizationsLedgersTransactionsByTransactionId", {
    name: "PatchV1OrganizationsLedgersTransactionsByTransactionId",
    description: `Update a Transaction with the input payload`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"transaction_id":{"type":"string","description":"Transaction ID"},"requestBody":{"description":"Transaction Input","properties":{"description":{"description":"Human-readable description of the transaction\nexample: Transaction description\nmaxLength: 256","maxLength":256,"type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional custom attributes\nexample: {\"purpose\": \"Monthly payment\", \"category\": \"Utility\"}","type":"object"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","transaction_id","requestBody"]},
    method: "patch",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/{transaction_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionsCancel", {
    name: "PostV1OrganizationsLedgersTransactionsCancel",
    description: `Cancel a previously created pre transaction`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"transaction_id":{"type":"string","description":"Transaction ID"}},"required":["Authorization","organization_id","ledger_id","transaction_id"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/{transaction_id}/cancel",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionsCommit", {
    name: "PostV1OrganizationsLedgersTransactionsCommit",
    description: `Commit a previously created transaction`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"transaction_id":{"type":"string","description":"Transaction ID"}},"required":["Authorization","organization_id","ledger_id","transaction_id"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/{transaction_id}/commit",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
  ["PatchV1OrganizationsLedgersTransactionsOperationsByOperationId", {
    name: "PatchV1OrganizationsLedgersTransactionsOperationsByOperationId",
    description: `Update an Operation with the input payload`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"transaction_id":{"type":"string","description":"Transaction ID"},"operation_id":{"type":"string","description":"Operation ID"},"requestBody":{"description":"Operation Input","properties":{"description":{"description":"Human-readable description of the operation\nexample: Credit card operation\nmaxLength: 256","maxLength":256,"type":"string"},"metadata":{"additionalProperties":{"type":"object"},"description":"Additional custom attributes\nexample: {\"reason\": \"Purchase refund\", \"reference\": \"INV-12345\"}","type":"object"}},"type":"object"}},"required":["Authorization","organization_id","ledger_id","transaction_id","operation_id","requestBody"]},
    method: "patch",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/{transaction_id}/operations/{operation_id}",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_id","in":"path"},{"name":"operation_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: []
  }],
  ["PostV1OrganizationsLedgersTransactionsRevert", {
    name: "PostV1OrganizationsLedgersTransactionsRevert",
    description: `Revert a Transaction with Transaction ID only`,
    inputSchema: {"type":"object","properties":{"Authorization":{"type":"string","description":"Authorization Bearer Token"},"X-Request-Id":{"type":"string","description":"Request ID"},"organization_id":{"type":"string","description":"Organization ID"},"ledger_id":{"type":"string","description":"Ledger ID"},"transaction_id":{"type":"string","description":"Transaction ID"}},"required":["Authorization","organization_id","ledger_id","transaction_id"]},
    method: "post",
    pathTemplate: "/v1/organizations/{organization_id}/ledgers/{ledger_id}/transactions/{transaction_id}/revert",
    executionParameters: [{"name":"Authorization","in":"header"},{"name":"X-Request-Id","in":"header"},{"name":"organization_id","in":"path"},{"name":"ledger_id","in":"path"},{"name":"transaction_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: []
  }],
]);

/**
 * Security schemes from the OpenAPI spec
 */
const securitySchemes =   {};


server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolsForClient: Tool[] = Array.from(toolDefinitionMap.values()).map(def => ({
    name: def.name,
    description: def.description,
    inputSchema: def.inputSchema
  }));
  return { tools: toolsForClient };
});


server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
  const { name: toolName, arguments: toolArgs } = request.params;
  const toolDefinition = toolDefinitionMap.get(toolName);
  if (!toolDefinition) {
    console.error(`Error: Unknown tool requested: ${toolName}`);
    return { content: [{ type: "text", text: `Error: Unknown tool requested: ${toolName}` }] };
  }
  return await executeApiTool(toolName, toolDefinition, toolArgs ?? {}, securitySchemes);
});



/**
 * Type definition for cached OAuth tokens
 */
interface TokenCacheEntry {
    token: string;
    expiresAt: number;
}

/**
 * Declare global __oauthTokenCache property for TypeScript
 */
declare global {
    var __oauthTokenCache: Record<string, TokenCacheEntry> | undefined;
}

/**
 * Acquires an OAuth2 token using client credentials flow
 * 
 * @param schemeName Name of the security scheme
 * @param scheme OAuth2 security scheme
 * @returns Acquired token or null if unable to acquire
 */
async function acquireOAuth2Token(schemeName: string, scheme: any): Promise<string | null | undefined> {
    try {
        // Check if we have the necessary credentials
        const clientId = process.env[`OAUTH_CLIENT_ID_SCHEMENAME`];
        const clientSecret = process.env[`OAUTH_CLIENT_SECRET_SCHEMENAME`];
        const scopes = process.env[`OAUTH_SCOPES_SCHEMENAME`];
        
        if (!clientId || !clientSecret) {
            console.error(`Missing client credentials for OAuth2 scheme '${schemeName}'`);
            return null;
        }
        
        // Initialize token cache if needed
        if (typeof global.__oauthTokenCache === 'undefined') {
            global.__oauthTokenCache = {};
        }
        
        // Check if we have a cached token
        const cacheKey = `${schemeName}_${clientId}`;
        const cachedToken = global.__oauthTokenCache[cacheKey];
        const now = Date.now();
        
        if (cachedToken && cachedToken.expiresAt > now) {
            console.error(`Using cached OAuth2 token for '${schemeName}' (expires in ${Math.floor((cachedToken.expiresAt - now) / 1000)} seconds)`);
            return cachedToken.token;
        }
        
        // Determine token URL based on flow type
        let tokenUrl = '';
        if (scheme.flows?.clientCredentials?.tokenUrl) {
            tokenUrl = scheme.flows.clientCredentials.tokenUrl;
            console.error(`Using client credentials flow for '${schemeName}'`);
        } else if (scheme.flows?.password?.tokenUrl) {
            tokenUrl = scheme.flows.password.tokenUrl;
            console.error(`Using password flow for '${schemeName}'`);
        } else {
            console.error(`No supported OAuth2 flow found for '${schemeName}'`);
            return null;
        }
        
        // Prepare the token request
        let formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        
        // Add scopes if specified
        if (scopes) {
            formData.append('scope', scopes);
        }
        
        console.error(`Requesting OAuth2 token from ${tokenUrl}`);
        
        // Make the token request
        const response = await axios({
            method: 'POST',
            url: tokenUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            data: formData.toString()
        });
        
        // Process the response
        if (response.data?.access_token) {
            const token = response.data.access_token;
            const expiresIn = response.data.expires_in || 3600; // Default to 1 hour
            
            // Cache the token
            global.__oauthTokenCache[cacheKey] = {
                token,
                expiresAt: now + (expiresIn * 1000) - 60000 // Expire 1 minute early
            };
            
            console.error(`Successfully acquired OAuth2 token for '${schemeName}' (expires in ${expiresIn} seconds)`);
            return token;
        } else {
            console.error(`Failed to acquire OAuth2 token for '${schemeName}': No access_token in response`);
            return null;
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error acquiring OAuth2 token for '${schemeName}':`, errorMessage);
        return null;
    }
}


/**
 * Executes an API tool with the provided arguments
 * 
 * @param toolName Name of the tool to execute
 * @param definition Tool definition
 * @param toolArgs Arguments provided by the user
 * @param allSecuritySchemes Security schemes from the OpenAPI spec
 * @returns Call tool result
 */
async function executeApiTool(
    toolName: string,
    definition: McpToolDefinition,
    toolArgs: JsonObject,
    allSecuritySchemes: Record<string, any>
): Promise<CallToolResult> {
  try {
    // Validate arguments against the input schema
    let validatedArgs: JsonObject;
    try {
        const zodSchema = getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
        const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
        validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ')}`;
            return { content: [{ type: 'text', text: validationErrorMessage }] };
        } else {
             const errorMessage = error instanceof Error ? error.message : String(error);
             return { content: [{ type: 'text', text: `Internal error during validation setup: ${errorMessage}` }] };
        }
    }

    // Prepare URL, query parameters, headers, and request body
    let urlPath = definition.pathTemplate;
    const queryParams: Record<string, any> = {};
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    let requestBodyData: any = undefined;

    // Apply parameters to the URL path, query, or headers
    definition.executionParameters.forEach((param) => {
        const value = validatedArgs[param.name];
        if (typeof value !== 'undefined' && value !== null) {
            if (param.in === 'path') {
                urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(String(value)));
            }
            else if (param.in === 'query') {
                queryParams[param.name] = value;
            }
            else if (param.in === 'header') {
                headers[param.name.toLowerCase()] = String(value);
            }
        }
    });

    // Ensure all path parameters are resolved
    if (urlPath.includes('{')) {
        throw new Error(`Failed to resolve path parameters: ${urlPath}`);
    }
    
    // Construct the full URL
    const requestUrl = API_BASE_URL ? `${API_BASE_URL}${urlPath}` : urlPath;

    // Handle request body if needed
    if (definition.requestBodyContentType && typeof validatedArgs['requestBody'] !== 'undefined') {
        requestBodyData = validatedArgs['requestBody'];
        headers['content-type'] = definition.requestBodyContentType;
    }


    // Apply security requirements if available
    // Security requirements use OR between array items and AND within each object
    const appliedSecurity = definition.securityRequirements?.find(req => {
        // Try each security requirement (combined with OR)
        return Object.entries(req).every(([schemeName, scopesArray]) => {
            const scheme = allSecuritySchemes[schemeName];
            if (!scheme) return false;
            
            // API Key security (header, query, cookie)
            if (scheme.type === 'apiKey') {
                return !!process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            // HTTP security (basic, bearer)
            if (scheme.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    return !!process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    return !!process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] && 
                           !!process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
            }
            
            // OAuth2 security
            if (scheme.type === 'oauth2') {
                // Check for pre-existing token
                if (process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    return true;
                }
                
                // Check for client credentials for auto-acquisition
                if (process.env[`OAUTH_CLIENT_ID_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] &&
                    process.env[`OAUTH_CLIENT_SECRET_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    // Verify we have a supported flow
                    if (scheme.flows?.clientCredentials || scheme.flows?.password) {
                        return true;
                    }
                }
                
                return false;
            }
            
            // OpenID Connect
            if (scheme.type === 'openIdConnect') {
                return !!process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            return false;
        });
    });

    // If we found matching security scheme(s), apply them
    if (appliedSecurity) {
        // Apply each security scheme from this requirement (combined with AND)
        for (const [schemeName, scopesArray] of Object.entries(appliedSecurity)) {
            const scheme = allSecuritySchemes[schemeName];
            
            // API Key security
            if (scheme?.type === 'apiKey') {
                const apiKey = process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (apiKey) {
                    if (scheme.in === 'header') {
                        headers[scheme.name.toLowerCase()] = apiKey;
                        console.error(`Applied API key '${schemeName}' in header '${scheme.name}'`);
                    }
                    else if (scheme.in === 'query') {
                        queryParams[scheme.name] = apiKey;
                        console.error(`Applied API key '${schemeName}' in query parameter '${scheme.name}'`);
                    }
                    else if (scheme.in === 'cookie') {
                        // Add the cookie, preserving other cookies if they exist
                        headers['cookie'] = `${scheme.name}=${apiKey}${headers['cookie'] ? `; ${headers['cookie']}` : ''}`;
                        console.error(`Applied API key '${schemeName}' in cookie '${scheme.name}'`);
                    }
                }
            } 
            // HTTP security (Bearer or Basic)
            else if (scheme?.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    const token = process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (token) {
                        headers['authorization'] = `Bearer ${token}`;
                        console.error(`Applied Bearer token for '${schemeName}'`);
                    }
                } 
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    const username = process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    const password = process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (username && password) {
                        headers['authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
                        console.error(`Applied Basic authentication for '${schemeName}'`);
                    }
                }
            }
            // OAuth2 security
            else if (scheme?.type === 'oauth2') {
                // First try to use a pre-provided token
                let token = process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                
                // If no token but we have client credentials, try to acquire a token
                if (!token && (scheme.flows?.clientCredentials || scheme.flows?.password)) {
                    console.error(`Attempting to acquire OAuth token for '${schemeName}'`);
                    token = (await acquireOAuth2Token(schemeName, scheme)) ?? '';
                }
                
                // Apply token if available
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OAuth2 token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
            // OpenID Connect
            else if (scheme?.type === 'openIdConnect') {
                const token = process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OpenID Connect token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
        }
    } 
    // Log warning if security is required but not available
    else if (definition.securityRequirements?.length > 0) {
        // First generate a more readable representation of the security requirements
        const securityRequirementsString = definition.securityRequirements
            .map(req => {
                const parts = Object.entries(req)
                    .map(([name, scopesArray]) => {
                        const scopes = scopesArray as string[];
                        if (scopes.length === 0) return name;
                        return `${name} (scopes: ${scopes.join(', ')})`;
                    })
                    .join(' AND ');
                return `[${parts}]`;
            })
            .join(' OR ');
            
        console.warn(`Tool '${toolName}' requires security: ${securityRequirementsString}, but no suitable credentials found.`);
    }
    

    // Prepare the axios request configuration
    const config: AxiosRequestConfig = {
      method: definition.method.toUpperCase(), 
      url: requestUrl, 
      params: queryParams, 
      headers: headers,
      ...(requestBodyData !== undefined && { data: requestBodyData }),
    };

    // Log request info to stderr (doesn't affect MCP output)
    console.error(`Executing tool "${toolName}": ${config.method} ${config.url}`);
    
    // Execute the request
    const response = await axios(config);

    // Process and format the response
    let responseText = '';
    const contentType = response.headers['content-type']?.toLowerCase() || '';
    
    // Handle JSON responses
    if (contentType.includes('application/json') && typeof response.data === 'object' && response.data !== null) {
         try { 
             responseText = JSON.stringify(response.data, null, 2); 
         } catch (e) { 
             responseText = "[Stringify Error]"; 
         }
    } 
    // Handle string responses
    else if (typeof response.data === 'string') { 
         responseText = response.data; 
    }
    // Handle other response types
    else if (response.data !== undefined && response.data !== null) { 
         responseText = String(response.data); 
    }
    // Handle empty responses
    else { 
         responseText = `(Status: ${response.status} - No body content)`; 
    }
    
    // Return formatted response
    return { 
        content: [ 
            { 
                type: "text", 
                text: `API Response (Status: ${response.status}):\n${responseText}` 
            } 
        ], 
    };

  } catch (error: unknown) {
    // Handle errors during execution
    let errorMessage: string;
    
    // Format Axios errors specially
    if (axios.isAxiosError(error)) { 
        errorMessage = formatApiError(error); 
    }
    // Handle standard errors
    else if (error instanceof Error) { 
        errorMessage = error.message; 
    }
    // Handle unexpected error types
    else { 
        errorMessage = 'Unexpected error: ' + String(error); 
    }
    
    // Log error to stderr
    console.error(`Error during execution of tool '${toolName}':`, errorMessage);
    
    // Return error message to client
    return { content: [{ type: "text", text: errorMessage }] };
  }
}


/**
 * Main function to start the server
 */
async function main() {
// Set up StreamableHTTP transport
  try {
    await setupStreamableHttpServer(server, 3031);
  } catch (error) {
    console.error("Error setting up StreamableHTTP server:", error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
    console.error("Shutting down MCP server...");
    process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the server
main().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});

/**
 * Formats API errors for better readability
 * 
 * @param error Axios error
 * @returns Formatted error message
 */
function formatApiError(error: AxiosError): string {
    let message = 'API request failed.';
    if (error.response) {
        message = `API Error: Status ${error.response.status} (${error.response.statusText || 'Status text not available'}). `;
        const responseData = error.response.data;
        const MAX_LEN = 200;
        if (typeof responseData === 'string') { 
            message += `Response: ${responseData.substring(0, MAX_LEN)}${responseData.length > MAX_LEN ? '...' : ''}`; 
        }
        else if (responseData) { 
            try { 
                const jsonString = JSON.stringify(responseData); 
                message += `Response: ${jsonString.substring(0, MAX_LEN)}${jsonString.length > MAX_LEN ? '...' : ''}`; 
            } catch { 
                message += 'Response: [Could not serialize data]'; 
            } 
        }
        else { 
            message += 'No response body received.'; 
        }
    } else if (error.request) {
        message = 'API Network Error: No response received from server.';
        if (error.code) message += ` (Code: ${error.code})`;
    } else { 
        message += `API Request Setup Error: ${error.message}`; 
    }
    return message;
}

/**
 * Converts a JSON Schema to a Zod schema for runtime validation
 * 
 * @param jsonSchema JSON Schema
 * @param toolName Tool name for error reporting
 * @returns Zod schema
 */
function getZodSchemaFromJsonSchema(jsonSchema: any, toolName: string): z.ZodTypeAny {
    if (typeof jsonSchema !== 'object' || jsonSchema === null) { 
        return z.object({}).passthrough(); 
    }
    try {
        const zodSchemaString = jsonSchemaToZod(jsonSchema);
        const zodSchema = eval(zodSchemaString);
        if (typeof zodSchema?.parse !== 'function') { 
            throw new Error('Eval did not produce a valid Zod schema.'); 
        }
        return zodSchema as z.ZodTypeAny;
    } catch (err: any) {
        console.error(`Failed to generate/evaluate Zod schema for '${toolName}':`, err);
        return z.object({}).passthrough();
    }
}
