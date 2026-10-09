import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ObjectivesDashboardScreen } from '../screens/ObjectivesDashboardScreen';
import { CategoriesCatalogScreen } from '../screens/CategoriesCatalogScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { CustomerProfileScreen } from '../screens/CustomerProfileScreen';
import { MarketplaceScreen } from '../screens/MarketplaceScreen';
import { QuoteEngineScreen } from '../screens/QuoteEngineScreen';
import { ComparisonScreen } from '../screens/ComparisonScreen';
import { ProposalFormScreen } from '../screens/ProposalFormScreen';
import { PolicyPurchaseCheckoutScreen } from '../screens/PolicyPurchaseCheckoutScreen';
import { PolicyIssuanceSuccessScreen } from '../screens/PolicyIssuanceSuccessScreen';
import { PolicyManagementScreen } from '../screens/PolicyManagementScreen';
import { ClaimsManagementScreen } from '../screens/ClaimsManagementScreen';
import { DocumentVaultScreen } from '../screens/DocumentVaultScreen';
import { NotificationCenterScreen } from '../screens/NotificationCenterScreen';
import { SupportCenterScreen } from '../screens/SupportCenterScreen';
import { AIRecommendationScreen } from '../screens/AIRecommendationScreen';
import { GlobalSearchScreen } from '../screens/GlobalSearchScreen';
import { AdvisorCRMScreen } from '../screens/AdvisorCRMScreen';
import { FraudDetectionScreen } from '../screens/FraudDetectionScreen';
import { ReportingDashboardScreen } from '../screens/ReportingDashboardScreen';
import { AdminPanelScreen } from '../screens/AdminPanelScreen';
import { RBACManagementScreen } from '../screens/RBACManagementScreen';
import { FunnelAnalyticsScreen } from '../screens/FunnelAnalyticsScreen';
import { MicroservicesDashboardScreen } from '../screens/MicroservicesDashboardScreen';
import { APIStandardsConsoleScreen } from '../screens/APIStandardsConsoleScreen';
import { OfflineStorageScreen } from '../screens/OfflineStorageScreen';
import { IntegrationsCatalogScreen } from '../screens/IntegrationsCatalogScreen';
import { SecurityVaultScreen } from '../screens/SecurityVaultScreen';
import { CompliancePortalScreen } from '../screens/CompliancePortalScreen';
import { SystemLoggingScreen } from '../screens/SystemLoggingScreen';
import { AuditTrailScreen } from '../screens/AuditTrailScreen';
import { InfrastructureScreen } from '../screens/InfrastructureScreen';
import { PerformanceSLAConsoleScreen } from '../screens/PerformanceSLAConsoleScreen';
import { ScalabilityEngineScreen } from '../screens/ScalabilityEngineScreen';
import { DisasterRecoveryScreen } from '../screens/DisasterRecoveryScreen';
import { MonitoringHubScreen } from '../screens/MonitoringHubScreen';
import { FutureInnovationScreen } from '../screens/FutureInnovationScreen';
import { NFRComplianceScreen } from '../screens/NFRComplianceScreen';
import { AcceptanceTestConsoleScreen } from '../screens/AcceptanceTestConsoleScreen';
import { FinalReleaseAuditScreen } from '../screens/FinalReleaseAuditScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Objectives: undefined;
  Categories: undefined;
  Auth: undefined;
  Profile: undefined;
  Marketplace: undefined;
  QuoteEngine: { categoryId?: string; categoryName?: string } | undefined;
  Comparison: undefined;
  ProposalForm: undefined;
  Checkout: undefined;
  IssuanceSuccess: undefined;
  PolicyManagement: undefined;
  ClaimsManagement: undefined;
  DocumentVault: undefined;
  NotificationCenter: undefined;
  SupportCenter: undefined;
  AIRecommendation: undefined;
  GlobalSearch: undefined;
  AdvisorCRM: undefined;
  FraudDetection: undefined;
  ReportingDashboard: undefined;
  AdminPanel: undefined;
  RBACManagement: undefined;
  FunnelAnalytics: undefined;
  MicroservicesDashboard: undefined;
  APIStandardsConsole: undefined;
  OfflineStorage: undefined;
  IntegrationsCatalog: undefined;
  SecurityVault: undefined;
  CompliancePortal: undefined;
  SystemLogging: undefined;
  AuditTrail: undefined;
  Infrastructure: undefined;
  PerformanceSLAConsole: undefined;
  ScalabilityEngine: undefined;
  DisasterRecovery: undefined;
  MonitoringHub: undefined;
  FutureInnovation: undefined;
  NFRCompliance: undefined;
  AcceptanceTestConsole: undefined;
  FinalReleaseAudit: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Objectives" component={ObjectivesDashboardScreen} />
        <Stack.Screen name="Categories" component={CategoriesCatalogScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Profile" component={CustomerProfileScreen} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="QuoteEngine" component={QuoteEngineScreen} />
        <Stack.Screen name="Comparison" component={ComparisonScreen} />
        <Stack.Screen name="ProposalForm" component={ProposalFormScreen} />
        <Stack.Screen name="Checkout" component={PolicyPurchaseCheckoutScreen} />
        <Stack.Screen name="IssuanceSuccess" component={PolicyIssuanceSuccessScreen} />
        <Stack.Screen name="PolicyManagement" component={PolicyManagementScreen} />
        <Stack.Screen name="ClaimsManagement" component={ClaimsManagementScreen} />
        <Stack.Screen name="DocumentVault" component={DocumentVaultScreen} />
        <Stack.Screen name="NotificationCenter" component={NotificationCenterScreen} />
        <Stack.Screen name="SupportCenter" component={SupportCenterScreen} />
        <Stack.Screen name="AIRecommendation" component={AIRecommendationScreen} />
        <Stack.Screen name="GlobalSearch" component={GlobalSearchScreen} />
        <Stack.Screen name="AdvisorCRM" component={AdvisorCRMScreen} />
        <Stack.Screen name="FraudDetection" component={FraudDetectionScreen} />
        <Stack.Screen name="ReportingDashboard" component={ReportingDashboardScreen} />
        <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
        <Stack.Screen name="RBACManagement" component={RBACManagementScreen} />
        <Stack.Screen name="FunnelAnalytics" component={FunnelAnalyticsScreen} />
        <Stack.Screen name="MicroservicesDashboard" component={MicroservicesDashboardScreen} />
        <Stack.Screen name="APIStandardsConsole" component={APIStandardsConsoleScreen} />
        <Stack.Screen name="OfflineStorage" component={OfflineStorageScreen} />
        <Stack.Screen name="IntegrationsCatalog" component={IntegrationsCatalogScreen} />
        <Stack.Screen name="SecurityVault" component={SecurityVaultScreen} />
        <Stack.Screen name="CompliancePortal" component={CompliancePortalScreen} />
        <Stack.Screen name="SystemLogging" component={SystemLoggingScreen} />
        <Stack.Screen name="AuditTrail" component={AuditTrailScreen} />
        <Stack.Screen name="Infrastructure" component={InfrastructureScreen} />
        <Stack.Screen name="PerformanceSLAConsole" component={PerformanceSLAConsoleScreen} />
        <Stack.Screen name="ScalabilityEngine" component={ScalabilityEngineScreen} />
        <Stack.Screen name="DisasterRecovery" component={DisasterRecoveryScreen} />
        <Stack.Screen name="MonitoringHub" component={MonitoringHubScreen} />
        <Stack.Screen name="FutureInnovation" component={FutureInnovationScreen} />
        <Stack.Screen name="NFRCompliance" component={NFRComplianceScreen} />
        <Stack.Screen name="AcceptanceTestConsole" component={AcceptanceTestConsoleScreen} />
        <Stack.Screen name="FinalReleaseAudit" component={FinalReleaseAuditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
