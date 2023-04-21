# Azure Active Directory

[Azure Active Directory とは](https://docs.microsoft.com/ja-jp/azure/active-directory/fundamentals/active-directory-whatis?context=/azure/active-directory/enterprise-users/context/ugr-context)

Azure テナント<br>Azure AD の信頼された専用インスタンスであり、組織が Microsoft Azure、Microsoft Intune、Microsoft 365 などの Microsoft クラウド サービスのサブスクリプションにサインアップしたときに自動的に作成されます。 <br>1 つの Azure テナントは単一の組織を表します。

[Azure Active Directory とは](https://learn.microsoft.com/ja-jp/training/modules/manage-users-and-groups-in-aad/2-create-aad)


![](https://learn.microsoft.com/ja-jp/training/modules/manage-users-and-groups-in-aad/media/2-azure-vs-windows-ad.png)


Microsoft が、現在提供しているクラウドベースサービス<br>・Microsoft Azure<br>・Microsoft 365<br>・Microsoft Intune<br>・Microsoft Dynamics 365<br><br>それらのすべてのサービスで、Azure AD を使用して、ユーザーを識別し、アクセスを制御することができる

[Azure サブスクリプションと Azure AD の管理者](https://jpazureid.github.io/blog/azure-active-directory/subscription-azure-ad-relationship/)

Azure サブスクリプションと Azure AD には包含関係は無く、独立しています。<br>Azure サブスクリプションは、必ず 1 つの Azure AD に関連付けられています (*注1) ので、両者の関係性は次のような図になります。


![](https://jpazureid.github.io/blog/azure-active-directory/subscription-azure-ad-relationship/subscription-relationship.png)


管理者についてもそれぞれ独立していますので、 <br>Azure サブスクリプションの管理者であっても Azure AD の全体管理者でなければ、 Azure AD の管理 (ユーザー追加、削除など) はできません。<br>同様に Azure AD の全体管理者であっても、必ずしも紐づく Azure サブスクリプションの管理者ではありません。

## ID

認証を受けることができるもの。 <br>ID は、ユーザー名とパスワードを持つユーザーの可能性があります。 <br>ID には、秘密キーまたは証明書による認証を必要とする可能性があるアプリケーションまたはその他のサーバーも含まれます

[Azure ADで利用できるID](https://qiita.com/hikaru_motomiya/items/35acd613feeb090be797#3azure-ad%E3%81%A7%E5%88%A9%E7%94%A8%E3%81%A7%E3%81%8D%E3%82%8Bid)

## Azure AD アカウント

Azure AD またはそれ以外の Microsoft クラウド サービス (Microsoft 365 など) を通じて作成される ID です。 <br>ID は Azure AD に保存され、組織のクラウド サービスのサブスクリプションで利用できます。 <br>このアカウントは、職場または学校アカウントと呼ばれることもあります。

## Azure AD テナント

[ Azure ADテナントとは](https://docs.microsoft.com/ja-jp/microsoft-365/education/deploy/intro-azure-active-directory)

 Azure AD テナントは、組織で使用されるアプリケーションとリソースに ID とアクセス管理 (IAM) 機能を提供します。<br> ID は、リソースへのアクセスを認証および承認できるディレクトリ オブジェクトです。<br> ID オブジェクトは、学生や教師などの人間の ID、教室や学生のデバイス、アプリケーション、サービスの原則などの人間以外の ID に対して存在します。<br><br> Azure ADテナントは、組織の IT 部門の管理下にある ID セキュリティ境界です。 このセキュリティ境界内では、オブジェクト (ユーザー オブジェクトなど) の管理とテナント全体の設定の構成は、IT 管理者によって制御されます。


![](https://docs.microsoft.com/ja-jp/microsoft-365/education/deploy/images/intro-to-azure-ad-1.png)


[ディレクトリ、サブスクリプション、およびユーザー](https://learn.microsoft.com/ja-jp/training/modules/manage-users-and-groups-in-aad/2-create-aad)

Microsoft が、現在提供しているクラウドベースサービス<br>・Microsoft Azure<br>・Microsoft 365<br>・Microsoft Intune<br>・Microsoft Dynamics 365<br><br>それらのすべてのサービスで、Azure AD を使用して、ユーザーを識別し、アクセスを制御することができる<br>企業または組織が、これらのサービスの 1 つを使用するためにサインアップすると、<br>既定の "ディレクトリ"、つまり Azure AD のインスタンスが割り当てられる<br>この "ディレクトリ"には、企業が購入した各サービスにアクセスできるユーザーとグループが保持される<br>この既定のディレクトリは、"テナント" と呼ばれる

[Azure Active Directory テナントの作成](https://learn.microsoft.com/ja-jp/microsoft-365/education/deploy/intro-azure-active-directory#creating-an-azure-active-directory-tenant)

Microsoft 365 Educationの有料サブスクリプションまたは試用版サブスクリプションにサインアップすると、基になるOffice 365 サービスの一部として Azure Active Directory (Azure AD) テナントが作成されます。 <br>同様に、Azure にサインアップすると、Azure AD テナントが作成されます。 <br>また、Azure portalを使用して Azure AD テナントを手動で作成し、後でOffice 365 サービスを追加することもできます。

[Azure ADテナント作成／Azureサブスクリプション契約時に検討すべきこと
TAG
Azure](https://cloud.bigtreetc.com/column/azure_ad_subscription/)

Azureの利用する場合、Active Directoryを保有しているかどうかに関わらずAzure ADテナントの作成が必須になります。<br>これは、Azureで使用するユーザはAzure ADで管理する必要があるためです。<br>また、実際のAzureリソースはAzureサブスクリプションと呼ばれるAzureアカウント上に作成されますが、このAzureサブスクリプションは必ずAzure ADテナントに紐づいています。


![](https://cloud.bigtreetc.com/rpawp/wp-content/uploads/2022/02/azure1-1.png)


### Azure サブスクリプション

Azureテナントはディレクトリであり、ユーザーやグループなどのアイデンティティ情報を管理する単位です。<br>Azureサブスクリプションは、リソースを配置できる「フォルダー」を表すオブジェクトであり、課金や制限などの設定が可能です。<br>サブスクリプションはテナントに関連付けられています。<br>したがって、1つのテナントは多くのサブスクリプションを持つことができますが、その逆はできません。<br>テナントは単一の ID（個人、会社、または組織）に関連付けられており、1つまたは複数のサブスクリプションを所有できます。

[Azure サブスクリプションと Azure AD について](https://jpazasms.github.io/blog/AzureSubscriptionManagement/20190125a/)

[Azure サブスクリプションを Azure Active Directory テナントに関連付けるまたは追加する](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/active-directory-how-subscriptions-associated-directory)

すべての Azure サブスクリプションには、Azure Active Directory (Azure AD) インスタンスとの信頼関係があります。 <br>サブスクリプションは信頼された Azure AD に依存して、セキュリティ プリンシパルとデバイスの認証と承認を行います。 <br>サブスクリプションの有効期限が切れると、Azure AD サービスの信頼されたインスタンスは残りますが、セキュリティ プリンシパルでは、Azure リソースへのアクセスができなくなります。 <br>サブスクリプションは 1 つのディレクトリのみを信頼できますが、1 つの Azure AD は複数のサブスクリプションから信頼されることができます

ユーザーが Microsoft のクラウド サービスに新規登録すると、新しい Azure AD テナントが作成され、そのユーザーは全体管理者ロールに属します。 <br>ただし、サブスクリプションの所有者が自分のサブスクリプションを既存のテナントに参加させるとき、その所有者は全体管理者ロールに割り当てられません。

[AzureサブスクリプションとかアカウントとかAzure ADのテナントとか (1)](https://qiita.com/whata/items/628e3a80e5a5c8fe7da9)

[Azure ADテナントとは？課金の仕組みや運用方法を解説](https://www.rworks.jp/cloud/azure/azure-column/azure-practice/27990/)

## Azure AD ロール

[Azure Active Directory のロールについて](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/concept-understand-roles)

ディレクトリ内の Azure AD リソースの管理に使用されます。<br>たとえば、<br>ユーザーの作成や編集、<br>他のユーザーへの管理ロールの割り当て、<br>ユーザー パスワードのリセット、<br>ユーザー ライセンスの管理、<br>ドメインの管理など

[各ロールの関係](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/rbac-and-directory-admin-roles?context=%2Fazure%2Factive-directory%2Froles%2Fcontext%2Fugr-context#how-the-roles-are-related)


![](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/media/rbac-and-directory-admin-roles/rbac-admin-roles.png)


[Azure ロールと Azure AD ロールの違い](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/rbac-and-directory-admin-roles?context=%2Fazure%2Factive-directory%2Froles%2Fcontext%2Fugr-context#differences-between-azure-roles-and-azure-ad-roles)


![](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/media/rbac-and-directory-admin-roles/azure-roles-azure-ad-roles.png)


[Azure AD の組み込みロール](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference)

[パスワードをリセットできるロール](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#who-can-reset-passwords)

### グローバル管理者

[グローバル管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#global-administrator)

### グローバル閲覧者

[グローバル閲覧者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#global-reader)

このロールのユーザーは、Microsoft 365 の各サービスにわたって設定と管理情報を読み取ることができますが、管理アクションを実行することはできません。 グローバル閲覧者は、全体管理者に対応する読み取り専用のロールです。 

### 特権ロール管理者

グローバル管理者を含む Azure AD の特権ロール付与や Privileged Identity Management (PIM) 機能を管理することができる

[特権ロール管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#privileged-role-administrator)

### グループ管理者

[グループ管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#groups-administrator)

このロールのメンバーは、グループの作成と管理、名前付けと有効期限ポリシーなどのグループ設定の作成と管理、グループのアクティビティと監査レポートの表示を行うことができます。

### セキュリティ管理者

[セキュリティ管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#security-administrator)

次のセキュリティ関連機能を管理するアクセス許可あり<br>Microsoft 365 Defender ポータル、Azure Active Directory Identity Protection、Azure Active Directory Authentication、Azure Information Protection、Microsoft Purview コンプライアンス ポータル

### セキュリティ オペレーター

### セキュリティ閲覧者

### パスワード管理者

[パスワード管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#password-administrator)

管理者以外とパスワード管理者のパスワードをリセットできます。

### 認証管理者

[認証管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#authentication-administrator)

- 管理者以外および一部のロールの認証方法 (パスワードを含む) の設定またはリセット。 <br>- 管理者以外または一部のロールに割り当てられているユーザーへの、パスワード以外の既存の資格情報 (MFA や FIDO など) に対する再登録の要求。このデバイスに MFA を記憶する機能を取り消して、次回サインイン時に MFA を要求することもできます。<br>- 一部のユーザーに対する機密性の高いアクションの実行。<br>- Azure と Microsoft 365 管理センターでのサポート チケットの作成および管理。

### アプリケーション管理者

[アプリケーション管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#application-administrator)

このロールのユーザーは、エンタープライズ アプリケーション、アプリケーション登録、アプリケーション プロキシの設定の全側面を作成して管理できます。 

### アプリケーション開発者

[アプリケーション開発者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#application-developer)

このロールのユーザーは、<br>[ユーザーはアプリケーションを登録できる] 設定が [いいえ] に設定されている場合に、アプリケーション登録を作成できる。 <br>[ユーザーはアプリが自身の代わりに会社のデータにアクセスすることを許可できる] 設定が [いいえ] に設定されている場合に、代わりに同意する権限を付与します。<br>新しいアプリケーション登録を作成する際に、所有者として追加されます。

### クラウド アプリケーション管理者

[クラウド アプリケーション管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#cloud-application-administrator)

このロールのユーザーは、(アプリケーション プロキシを管理する権限を除き) アプリケーション管理者ロールと同じアクセス許可を持ちます

### 課金管理者

[課金管理者](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/permissions-reference#billing-administrator)

購入、サブスクリプションの管理、サポート チケットの管理、サービスの正常性の監視

### カスタム ロール

 Azure AD のリソースに対するアクセス許可を管理するためのカスタムロール

[Azure Active Directory のロールベースのアクセス制御の概要](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/custom-overview)

- Azure AD ロールでは、Microsoft Graph API を使用して、ユーザー、グループ、アプリケーションなどの Azure AD リソースへのアクセスを制御します<br>- Azure ロールでは、Azure Resource Management を使用して、仮想マシンやストレージなどの Azure リソースへのアクセスを制御します

[Azure portal を使用して Azure カスタム ロールを作成または更新する](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/custom-roles-portal)

カスタム ロールの作成を開始するには、次の 3 つの方法<br>・ロールを複製<br>・最初から行う<br>・JSON から始める

[ロールを複製する](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/custom-roles-portal#clone-a-role)

１．Azure portal で、カスタム ロールを割り当て可能にするサブスクリプションまたはリソース グループを開き、 [アクセス制御 (IAM)] を開きます。<br>⒉．[ロール] タブをクリックして、すべての組み込みおよびカスタム ロールの一覧を表示<br>　　複製するロールを検索

[Azure Active Directory でカスタム ロールを作成して割り当てる](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/custom-create)

[Azure Active Directory]>[ロールと管理者]>[新しいカスタム ロール] 

### ベスト プラクティス

[Azure AD ロールのベスト プラクティス](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/best-practices)

[Azure Active Directory のタスク別の最小特権ロール](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/delegate-by-task)

## Azure AD グループ

2 種類のグループと 3 種類のグループ メンバーシップがあります

[Azure Active Directory のグループとアクセス権の詳細](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/concept-learn-about-groups)

[Azure AD管理センターの内容解説【MicrosoftのMVP解説！第三弾 Microsoft 365の活用術】](https://blogs.manageengine.jp/office365-14/)

[Azure AD グループを使用してロールの割り当てを管理する](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/groups-concept)

グループにロールを割り当てるには、isAssignableToRole プロパティが true に設定された新しいセキュリティ グループまたは Microsoft 365 グループを作成する必要があります

[Azure AD グループを使用してロールの割り当てを管理する](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/groups-concept)

グループの入れ子化はサポートされていません。 グループは、ロール割り当て可能なグループのメンバーとして追加することはできません。

### セキュリティ グループ

[グループの種類](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/concept-learn-about-groups#group-types)

セキュリティ: 共有リソースに対するユーザーとコンピューターのアクセスを管理するために使います

たとえば、セキュリティ グループを作成し、グループの全メンバーに同じセキュリティ アクセス許可セットが付与されるようにすることができます。 <br>セキュリティ グループのメンバーには、ユーザー、デバイス、他のグループ、サービス プリンシパルを含めることができます。これにより、アクセス ポリシーとアクセス許可を定義します。 <br>セキュリティ グループ所有者には、ユーザーとサービス プリンシパルを含めることができます。

### Microsoft 365 グループ

[グループの種類](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/concept-learn-about-groups#group-types)

Microsoft 365: 共有メールボックス、カレンダー、ファイル、SharePoint サイトなどへのアクセス権をグループ メンバーに付与することで、共同作業の機会を提供します

組織外のユーザーにグループへのアクセス権を付与することもできます。 <br>Microsoft 365 グループのメンバーには、ユーザーのみを含めることができます。 <br>Microsoft 365 グループ所有者には、ユーザーとサービス プリンシパルを含めることができます

[Azure Active Directory で削除された Microsoft 365 グループを復元する](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/groups-restore-deleted)

Azure Active Directory (Azure AD) で Microsoft 365 グループを削除すると、削除されたグループは表示されなくなりますが、削除日から 30 日間は保持されます。 <br>この動作は、必要に応じて、グループとその内容を復元できるようにするためです。 この機能は、Azure AD の Microsoft 365 グループに限定されます。

#### 名前付けポリシー

グループの名前付けポリシーとは、ユーザーが作成するグループの名前に一貫性を持たせるための機能です。<br>プレフィックスやサフィックスを使って、グループの役割やメンバー、地域などを表現できます。また、不適切な単語の使用をブロックすることもできます

名前付けポリシーは、Microsoft 365 グループに適用されます。<br>これには、Outlook、Microsoft Teams、SharePoint、Planner、Yammer などのグループ ワークロードが含まれます。<br>配布グループにも名前付けポリシーを適用できます。

[Azure Active Directory での Microsoft 365 グループに対する名前付けポリシーの適用](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/groups-naming-policy)

名前付けポリシーは、全体管理者やユーザー管理者などの特定のディレクトリ ロールには適用されません<br>既存の Microsoft 365 グループの場合、ポリシーは構成時にすぐには適用されません。 グループ所有者がこれらのグループのグループ名を編集すると、変更が行われていなくても、名前付けポリシーが適用されます。

### 動的グループ

[Azure Active Directory で動的グループを作成または更新する](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/groups-create-rule)

- ユーザーまたはデバイスのプロパティに基づいてグループ メンバーシップを決定するルールを使用<br>- セキュリティ グループと Microsoft 365 グループ に対して、動的メンバーシップをサポート<br>- グループ メンバーシップのルールが適用されるときに、ユーザーとデバイスの属性がメンバーシップのルールと一致するかどうかが評価される<br>- ユーザーまたはデバイスの属性が変更されると、組織内のすべての 動的グループ ルール が、メンバーシップの変更のために処理される<br>- ユーザーとデバイスは、グループの条件を満たす場合に、追加または削除される<br>- セキュリティ グループはデバイスとユーザーのどちらにも使用できるが、<br>Microsoft 365 グループはユーザー グループのみが可能

[Azure Active Directory の動的グループ メンバーシップ ルール](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/groups-dynamic-membership)

[Azure ADの動的なグループメンバーシップ設定](https://azuread.net/archives/5472)

### メンバーシップ

[メンバーシップの種類](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/concept-learn-about-groups#membership-types)

#### 割り当て済み

特定のユーザーをグループのメンバーとして追加し、固有のアクセス許可を付与することができます

#### 動的ユーザー

動的メンバーシップ ルールを使用して、メンバーを自動的に追加および削除できます

#### 動的デバイス

動的なグループ ルールを使用して、自動的にデバイスを追加および削除できます

## Azure AD ユーザー

[ユーザーの作成と管理](https://learn.microsoft.com/ja-jp/training/modules/manage-users-and-groups-in-aad/3-users)

Azure リソースへのアクセスを必要とするすべてのユーザーには、Azure ユーザー アカウントが必要

[Azure Active Directory を使用して最近削除されたユーザーを復元または削除する](https://learn.microsoft.com/ja-jp/azure/active-directory/fundamentals/active-directory-users-restore?context=%2Fazure%2Factive-directory%2Fenterprise-users%2Fcontext%2Fugr-context)

ユーザーを削除した後、アカウントは 30 日間、中断状態のままになります。 <br>その 30 日の期間中は、ユーザー アカウントをそのすべてのプロパティと共に復元することができます。

### クラウド ID

このカテゴリのユーザーは、Azure AD 内にのみ存在し、他のオンプレミス AD サーバーには存在しません。 <br>これらのユーザーのソースは Azure AD になります。

### ディレクトリ同期 ID

このカテゴリのユーザーは、Azure クラウド環境に取り込む予定のオンプレミス AD に元々存在していた。<br>これを行うには、Azure AD Connect を利用した同期アクティビティを使用して、これらのユーザーを Azure AD に取り込み、オンプレミスと AD のクラウド インスタンスの両方に存在できるようにします。

### ゲスト ユーザー

これらのユーザーは Azure の外部に存在します。 <br>例として、他のクラウド プロバイダーのアカウント、Xbox LIVE アカウントなどの Microsoft アカウントがあります。 <br>そのソースは、招待されたユーザーです。 <br>この種類のアカウントは、外部ベンダーや請負業者が Azure リソースへのアクセスを必要とする場合に便利です。 <br>ヘルプが不要になったら、アカウントとすべてのアクセス権を削除できます。

### ユーザー プリンシパル名

- Azureのユーザー プリンシパル名 (UPN) とは、Azure AD テナントのユーザー オブジェクトに割り当てられる一意の識別子<br>- UPNは、ユーザーがAzure ADにサインインするときに使用<br>- 例えば、us1@contoso.onmicrosoft.comというUPNを持つユーザー オブジェクトがあるとします。この場合、us1はMailNickName属性、contoso.onmicrosoft.comは検証済みドメインです。

[Azure AD の UserPrincipalName の設定](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/plan-connect-userprincipalname)

UserPrincipalName は、インターネット標準 RFC 822 に基づく属性で、ユーザーのインターネット形式のログイン名となります。

## Azure AD へのユーザーの追加方法

[Azure Active Directory でのユーザーの一括作成](https://learn.microsoft.com/ja-jp/azure/active-directory/enterprise-users/users-bulk-add)

 必須値は、 [名前] 、 [ユーザー プリンシパル名] 、 [初期パスワード] 、および [サインインのブロック (はい/いいえ)] のみ

### オンプレミス Windows Server AD の同期

### Azure ポータル

### コマンドライン ツール

### 他のオプション

## 管理単位

[Azure Active Directory の管理単位](https://learn.microsoft.com/ja-jp/azure/active-directory/roles/administrative-units?source=recommendations)

[Azure ADでOUを作成](https://azuread.net/archives/9763)


![](https://azuread.net/wp/wp-content/uploads/2019/01/image_thumb-9.png)


## 外部 ID

[Azure Active Directory の External Identities](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/external-identities-overview)

### B2B コラボレーション

外部ユーザーが自分の好みの ID を使用して Microsoft アプリケーションや他のエンタープライズ アプリケーション (SaaS アプリ、カスタム開発アプリなど) にサインインすることで、外部ユーザーと共同作業を行います。 B2B コラボレーション ユーザーはディレクトリで表され、通常はゲスト ユーザーとして表示されます。

#### 外部コラボレーション

Azure Active Directory (Azure AD) を使用して、組織外のユーザーと協力して作業できる機能<br>外部コラボレーションの設定を有効にすると、ゲストユーザーを招待したり、特定のドメインを許可したりブロックしたり、ゲストユーザーのアクセス権限を制限したりすることができます

[外部コラボレーションの設定を構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/external-identities/external-collaboration-settings-configure)

## ハイブリッド ID

Azure Active Directory (Azure AD) をオンプレミスの AD と同期することで、従業員の ID の管理を一元化できます。

[Azure Active Directory でのハイブリッド ID とは](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-hybrid-identity)

3 つの認証方法のうち 1 つを使用できます。 次に 3 つの方法を示します。<br>- パスワード ハッシュの同期 (PHS)<br>- パススルー認証 (PTA)<br>- フェデレーション (AD FS)<br><br>これらの認証方法でも、シングル サインオン機能が提供されます

[Azure Active Directory ハイブリッド ID ソリューションの適切な認証方法を選択する](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/choose-ad-authn)

**Azure AD のパスワード ハッシュ同期**<br>Azure AD でオンプレミスのディレクトリ オブジェクトの認証を有効にする最も簡単な方法<br>ユーザーはオンプレミスで使用しているものと同じユーザー名とパスワードを使用できる<br>追加のインフラストラクチャを展開する必要はない

**Azure AD パススルー認証**<br>1 つ以上のオンプレミス サーバーで実行されているソフトウェア エージェントを使用して、Azure AD 認証サービスに簡単なパスワード検証を提供する <br>オンプレミスの Active Directory を使用してサーバーで直接ユーザーが検証され、クラウドでパスワードの検証が行われることはない<br>オンプレミスのユーザー アカウントの状態、パスワード ポリシー、およびサインイン時間をすぐに適用するセキュリティ要件のある企業は、この認証方法を使用する 

**フェデレーション認証**<br>Azure AD は別の信頼された認証システム (オンプレミスの Active Directory フェデレーション サービス (AD FS) など) に、ユーザーのパスワードを検証する認証プロセスを引き継ぐ

### Azure AD Connect 

[Azure AD Connect とは](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-azure-ad-connect)

[Azure AD Connect を使用する理由](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-azure-ad-connect#why-use-azure-ad-connect)

[Azure AD Connect:アカウントとアクセス許可](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-accounts-permissions)

[Azure AD Connect に使用されるアカウント](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-accounts-permissions#accounts-used-for-azure-ad-connect)

[簡単設定を使用したインストール](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-accounts-permissions#express-settings-installation)

[Azure AD 全体管理者の資格情報](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-accounts-permissions#azure-ad-global-admin-credentials)

Azure AD 全体管理者アカウントに対する資格情報は、インストール中にのみ使用されます。 <br>このアカウントは、Azure AD に変更を同期する Azure AD コネクタ アカウントを作成するために使用します。 <br>また、このアカウントにより、同期が Azure AD の機能として有効化されます。

[AD DS エンタープライズ管理者の資格情報](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/reference-connect-accounts-permissions#ad-ds-enterprise-administrator-credentials)

AD DS エンタープライズ管理者アカウントは、Windows Server AD の構成に使用されます。 これらの資格情報が使用されるのは、インストール中のみです。 <br>ドメイン管理者ではなく、エンタープライズ管理者が、すべてのドメインで Windows Server AD 内のアクセス許可が設定できることを確認する必要があります。<br><br>DirSync からアップグレードする場合は、<br>AD DS エンタープライズ管理者の資格情報を使用して、DirSync で使用されていたアカウントのパスワードをリセットします。 <br>Azure AD グローバル管理者の資格情報も必要になります。

[Azure AD Connectを使ってアカウントを同期する方法](https://developers.gmo.jp/383/)

#### 同期規則エディター

Azure AD Connect 同期 の 既定の構成 を表示したり変更したりするツール

[Azure AD Connect 同期: 既定の構成に変更を加える](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-sync-change-the-configuration)


![](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/media/how-to-connect-sync-change-the-configuration/startmenu2.png)


#### フィルター処理

[Azure AD Connect 同期: フィルター処理の構成](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-sync-configure-filtering)

フィルター処理を使用することによって、オンプレミスのディレクトリからどのオブジェクトを Azure Active Directory (Azure AD) に反映するかを制御できる

##### フィルター処理オプション

[フィルター処理オプション](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-sync-configure-filtering#filtering-options)

###### 属性ベース

オブジェクトの属性値に基づいてオブジェクトをフィルター処理<br>オブジェクトの種類ごとに異なるフィルターを使用することもできる

### Azure AD Connect Health

### 認証

[Azure Active Directory ハイブリッド ID ソリューションの適切な認証方法を選択する](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/choose-ad-authn)

#### パスワード ハッシュ同期

[Azure AD とのパスワード ハッシュ同期とは](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-phs)

Azure AD Connect は、オンプレミスの Active Directory インスタンスからクラウドベースの Azure AD インスタンスに向けて、ユーザーのパスワードのハッシュと同期します。

[詳細な考慮事項](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/choose-ad-authn#cloud-authentication-password-hash-synchronization)

パスワード ハッシュ同期は、展開、メンテナンス、インフラストラクチャに関して最小の作業量

#### パススルー認証

[Azure Active Directory パススルー認証とは](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/how-to-connect-pta)

Azure Active Directory (Azure AD) パススルー認証を使用すると、ユーザーは同じパスワードを使用して、オンプレミスのアプリケーションとクラウド ベースのアプリケーションの両方にサインインできます。

[詳細な考慮事項](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/choose-ad-authn#cloud-authentication-pass-through-authentication)

#### フェデレーション

[Azure AD とのフェデレーションとは](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/whatis-fed)

[詳細な考慮事項](https://learn.microsoft.com/ja-jp/azure/active-directory/hybrid/choose-ad-authn#federated-authentication-1)

信頼できる外部システムを利用してユーザーを認証する<br>フェデレーション システムへの既存の投資を Azure AD ハイブリッド ID ソリューションで再利用できる

[Azure AD でシングル サインオン！！　～フェデレーション編～](https://www.cloudou.net/azure-active-directory/aad003/)

## Privileged Identity Management

特権ロールが必要になったとき、利用者側の要求に従って、特定の時間だけ特権ロールを付与することができる

[Azure AD Privileged Identity Management とは](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-configure)

Privileged Identity Management (PIM) は、お客様の組織内の重要なリソースへのアクセスを管理、制御、監視することができる

[Privileged Identity Management で拒否された Azure リソースへのアクセスのトラブルシューティング](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-troubleshoot)

Privileged Identity Management サービスから Azure リソースへのアクセスができるようにするには、Azure サブスクリプションで MS-PIM サービス プリンシパルにユーザー アクセス管理者ロールが常に割り当てられている必要があります。

[1.1.4. Azure AD Pricileged Identity Management](https://github.com/naonao71/note/blob/main/AZ-500/memo.md#114-azure-ad-pricileged-identity-management)

PIMの主な機能の確認<br><br>・ JIT（Just-In-Time）によって、作業時のみ権限を割り当てる。これは0.5～24時間まで<br>・ リソースへの期限付きアクセス（権限を割り当てる際にあらかじめ有効期間を設定する）<br>・ その権限を有効にするための承認プロセス<br>・ 特権アカウントを使用する際に、MFAを確実に使用（全ユーザーがMFAを使用している場合＜すでにMFAにてログインしている＞は再度サインインする必要なし）<br>・ そのアカウントのロールが必要な理由を明確化する。これによって、監査が容易になります。<br>・ 特権アカウントが割り当てられた際の通知<br>・ アクセスレビューによる、特権アカウントの割り当て把握<br>・ 監査履歴をしようすることで、PIMイベントを継続的に追跡可能。外部監査にも利用できる。

[Azure AD グループ + PIM で特権ロールを管理してみた！](https://blog.cloudnative.co.jp/9188/)

[Privileged Identity Management (PIM) を使って Azure の権限管理をやってみた](https://www.softbanktech.co.jp/special/blog/cloud_blog/2020/0012/)

主な特徴としては、特権ロールが必要ないときは、利用者に必要最低限のロールを付与しておき、特権ロールが必要になったとき、利用者側の要求に従って、特定の時間だけ特権ロールを付与することができます。管理者は能動的に利用者に権限付与をするのではなく、利用者からの要求に従って、必要な時間だけ必要な特権ロールを付与することができるようになります。

[PIMサービスの概要と画面イメージの紹介](https://cloudsteady.jp/post/33813/)

普段使いのロールを割当てる際には「Active」タイプのロールを割当てて、<br>特権ロールに関しては「Eligible」で割当てる（特権ロールを申請する資格がある）


![](https://cloudsteady.jp/wp-content/uploads/2021/02/image-1.png)



![](https://cloudsteady.jp/wp-content/uploads/2021/02/image-4.png)


[Azure AD Privileged Identity Management で管理者権限の利用を制御する](https://www.illuminate-j.jp/blog/m365_security21_aad_pim)

### ロールの設定

[Privileged Identity Management で Azure AD ロールの設定を構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings)

Azure AD ロールの PIM ロール設定を管理するには、グローバル管理者または特権ロール管理者ロールが必要です。<br>ロール設定は、ロールごとに定義されます。<br>同じロールに対するすべての割り当ては、同じロール設定に従います。 <br>あるロールのロール設定は、別のロールのロール設定とは独立しています。

[アクティブ化の最大期間](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#activation-maximum-duration)

ロールの割り当てのアクティブ化要求が、有効期限が切れるまでアクティブなままである最大時間 (時間単位) 

[アクティブ化の際に多要素認証を要求する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#on-activation-require-multi-factor-authentication)

[アクティブ化の正当な理由を要求する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#require-justification-on-activation)

[アクティブ化時にチケット情報を要求する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#require-ticket-information-on-activation)

[アクティブ化の承認を必須にする](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#require-approval-to-activate)

[割り当て期間](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#assignment-duration)

[アクティブな割り当てに対して多要素認証を要求する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#require-multi-factor-authentication-on-active-assignment)

[アクティブな割り当ての理由を要求する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#require-justification-on-active-assignment)

[Azure AD Privileged Identity Management で管理者権限の利用を制御する](https://www.illuminate-j.jp/blog/m365_security21_aad_pim)


![](https://www.illuminate-j.jp/wp-content/uploads/2021/05/Blog_M365_21_05.jpg)



![](https://www.illuminate-j.jp/wp-content/uploads/2021/05/Blog_M365_21_06.jpg)


### 割り当て

[ロールの割り当ての概要](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-configure#role-assignment-overview)

[割り当て](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-configure#assign)

[Azure AD Privileged Identity Management で管理者権限の利用を制御する](https://www.illuminate-j.jp/blog/m365_security21_aad_pim)


![](https://www.illuminate-j.jp/wp-content/uploads/2021/05/Blog_M365_21_08.jpg)


#### Active（アクティブ）

この種類のロールを割当てられたユーザーは、<br>アクティベーションの操作を必要とせずに、そのロールが常にアクティブ化される。

#### Eligible（有資格）

この種類のロールを割当てられたユーザーは、<br>そのロールをアクティベートする資格を有しており、<br>アクティベートすることによって、最大24時間そのロールをアクティブ化することができる。

##### アクティブ化

[アクティブ化](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-configure#activate)

ユーザーが有資格の割り当てを持っている場合は、ロールを使用する前にロールの割り当てをアクティブにする必要がある<br>ロールをアクティブにするには、ユーザーは最大範囲 (管理者が設定) 内で特定のアクティブ化期間と、アクティブ化要求の理由を選択する

[PIMサービスの概要と画面イメージの紹介](https://cloudsteady.jp/post/33813/)


![](https://cloudsteady.jp/wp-content/uploads/2021/02/image-4.png)


申請者はAzure Portalから特権ロールを申請(アクティブ化)します。<br>※申請者は申請する資格を有する、つまり該当ロールがEligibleタイプで割り当てられていることが前提条件です。


![](https://cloudsteady.jp/wp-content/uploads/2021/02/image-5.png)


###### MFAの要求

[アクティブ化時](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-change-default-settings#on-activation)

ロールの割り当てをアクティブ化するために多要素認証を要求するには、 [Edit role setting](ロールの設定の編集) の [アクティブ化] タブで [On activation, require Azure MFA](アクティブ化時に Azure MFA を要求する) を選択

[Azure AD Privileged Identity Management で管理者権限の利用を制御する](https://www.illuminate-j.jp/blog/m365_security21_aad_pim)


![](https://www.illuminate-j.jp/wp-content/uploads/2021/05/Blog_M365_21_05.jpg)


###### 要求の承認

[要求の承認](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/azure-ad-pim-approval-workflow#approve-requests)

承認者は自分自身のロールのアクティブ化要求を承認できません。

### 特権アクセスグループ

[Privileged Identity Management に特権アクセス グループ (プレビュー) を持ち込む](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/groups-discover-groups)

[管理するグループを識別する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/groups-discover-groups#identify-groups-to-manage)

Azure AD でロールを割り当て可能なグループを作成できます。 <br>グループを Privileged Identity Management で管理するには、<br>グループの所有者のロール、または<br>グローバル管理者のロール、または<br>特権ロール管理者のロール<br>に設定されている必要があります。

### セキュリティ アラート

[Privileged Identity Management で Azure AD ロールに対するセキュリティ アラートを構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-how-to-configure-security-alerts?tabs=new)

## Microsoft Entra Identity Governance

Identity Governanceは、「適切なユーザーに」 「適切なアクセス権を」 「適切な期間のみ」 を実現するもの

[Identity Governance を設計する](https://learn.microsoft.com/ja-jp/microsoft-365/education/deploy/design-identity-governance)

### アクセス レビュー

Microsoft 365 を利用するにあたり、グループメンバーの管理やアプリケーション連携、管理者ロールの割り当て変更など、様々な管理業務が定期的に発生<br>日々適切な管理ができていれば問題ないが、完全自動化されていない限り、<br>うっかり権限を変更しないまま運用したり、所属しているグループのメンバーが把握しきれていない状態になったりしてしまう可能性もある。<br>過剰な権限を与えたままでは、資格情報の流出による Microsoft 365 への侵入などのリスクも考えられる<br>管理者は、不必要な権限を削除し、適切なグループ管理を行うよう、適宜確認して運用することが望ましい<br><br>「アクセス レビュー」は、所謂「棚卸し」の機能で、グループやアプリに対するユーザーのアクセス状況が確認できる<br>不要なメンバーや権限を効率的に削除することが可能

[アクセス レビューとは](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/access-reviews-overview)

[アクセス レビューが重要である理由](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/access-reviews-overview#why-are-access-reviews-important)

[アクセス レビューを使用すべきとき](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/access-reviews-overview#when-should-you-use-access-reviews)

[レビューを作成する場所](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/access-reviews-overview#where-do-you-create-reviews)

[「アクセスレビュー」で、グループやアプリ、管理者ロールを効率的に管理](https://live-style.jp/efficient-with-access-reviews/)

[Azure AD でグループとアプリケーションのアクセス レビューを作成する](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/create-access-review)

[PIM で Azure リソース ロールと Azure AD ロールのアクセス レビューを作成する](https://learn.microsoft.com/ja-jp/azure/active-directory/privileged-identity-management/pim-create-azure-ad-roles-and-resource-roles-review)

[Azure AD でグループとアプリケーションのアクセス レビューを作成する](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/create-access-review)

[Microsoft Entra アクセス レビューの展開を計画する](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/deploy-access-reviews)

[レビューが可能なリソースの種類は?](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/deploy-access-reviews#what-resource-types-can-be-reviewed)

- シングル サインオンのために Azure AD に統合されたアプリケーション (SaaS、基幹業務など) へのユーザー アクセス。<br>- グループ メンバーシップ (Azure AD と同期されるか、Azure AD または Microsoft 365 (Microsoft Teams を含む) で作成されるもの)。<br>- リソース (グループ、アプリ、サイト) を 1 つのパッケージにグループ化してアクセスを管理するアクセス パッケージ。<br>- Privileged Identity Management (PIM) で定義された Azure AD ロールと Azure リソース ロール。

[アクセス レビューを作成および管理するのは誰か?](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/deploy-access-reviews#who-will-create-and-manage-access-reviews)

[アクセス レビューの計画を立てる](https://learn.microsoft.com/ja-jp/training/modules/plan-implement-manage-access-review/2-plan-for-access-reviews)

#### レビュー担当者

[リソースへのアクセスをレビューするのは誰か?](https://learn.microsoft.com/ja-jp/azure/active-directory/governance/deploy-access-reviews#who-will-review-the-access-to-the-resource)

誰がレビューを行うかは、アクセス レビューの作成者が作成時に決定します。 <br>この設定は、レビューが開始した後は変更できません。 <br>‣リソースのビジネス オーナーであるリソース所有者。<br>‣アクセス レビューの管理者によって個別に選択された委任。<br>‣継続的なアクセスの必要性を各自で自己証明するユーザー。<br>‣マネージャーは、直属の部下によるリソースへのアクセスをレビューします。

[グループとアプリのアクセス レビューを作成する](https://learn.microsoft.com/ja-jp/training/modules/plan-implement-manage-access-review/3-create-access-reviews-for-groups-apps)

[レビュー担当者を選択する] セクションで、アクセス レビューを実行する人を 1 人以上選択します。 次の項目から選択できます。<br>- グループ所有者 (チームまたはグループに対するレビューを実行する場合のみ使用可能)<br>- Selected user(s) or groups(s) (選択したユーザーまたはグループ)<br>- Users review own access (ユーザーが自分のアクセスを確認する)<br>- (プレビュー) Managers of users (ユーザーの管理者)。 [Managers of users](ユーザーの管理者) または [グループ所有者] を選択した場合は、フォールバック レビュー担当者を指定することもできます。 フォールバック レビュー担当者は、そのユーザーの管理者がディレクトリで指定されていないか、またはそのグループに所有者がいない場合にレビューを実行するよう求められます。

## 条件付きアクセス

条件付きアクセスとは、Azure AD への認証に対して、制限対象 (割り当て)に該当するユーザーを許可 or 拒否 (アクセス制御)する事ができる機能です。<br>これは、Azure AD の「認証」と「認可」に対して、アクセス条件を追加する機能です。

Azure AD の条件付きアクセスの設定手順は次のとおりです。<br>1.Azure portal に、条件付きアクセス管理者、セキュリティ管理者、または全体管理者としてサインインします。<br>2.[Azure Active Directory][セキュリティ][条件付きアクセス] の順に移動します。<br>3.[新しいポリシー] を選択します。<br>4.ポリシーに名前を付けます。

[条件付きアクセスとは](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/overview)


![](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/media/overview/conditional-access-signal-decision-enforcement.png)


[条件付きアクセスのデプロイを計画する](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/plan-conditional-access)

### 条件付きアクセス ポリシー

条件付きアクセス ポリシーは、ユーザーがリソースにアクセスする場合に、ユーザーはアクションを完了する必要があるという if-then ステートメント<br> 例: 給与管理者は、給与処理アプリケーションにアクセスしようとする場合、多要素認証を実行することが要求される


![](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/media/overview/conditional-access-overview-how-it-works.png)


[条件付きアクセスポリシー(CA)](https://github.com/naonao71/note/blob/main/AZ-500/memo.md#%E6%9D%A1%E4%BB%B6%E4%BB%98%E3%81%8D%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BCca)

CAのポイント<br>- CAポリシーに優先順位という概念はない<br>- すべてのポリシーが評価され、割り当て条件に合致したサインインイベントに対し、制御がすべて適用される<br>- 許可よりもブロックが勝つ

[条件付きアクセスの基本的な考え方](https://jpazureid.github.io/blog/azure-active-directory/conditional-access-basic/)

#### 割り当て

##### ユーザーとグループ

##### クラウドアプリ

##### 条件

###### 場所

[場所](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-conditions#locations)

[【Azure】条件付きアクセスの設定方法解説！【ポータルへのアクセスをIPアドレスで制限する】](https://engineer-ninaritai.com/azure-conditional-access/)

許可するIPアドレスの指定<br>「ネームド ロケーション」＞「新しい場所」


![](https://engineer-ninaritai.com/wp-content/uploads/2020/02/%E6%9D%A1%E4%BB%B6%E4%BB%98%E3%81%8D%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B94.png)



![](https://engineer-ninaritai.com/wp-content/uploads/2020/02/%E6%9D%A1%E4%BB%B6%E4%BB%98%E3%81%8D%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B96.png)


#### アクセス制御

##### 許可

###### アクセスのブロック

[アクセスのブロック](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-grant#block-access)

###### アクセス権の付与

[アクセス権の付与](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-grant#grant-access)

####### 多要素認証

[[多要素認証を要求する]](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-grant#require-multi-factor-authentication)

[条件付きアクセスによるMFA有効化](https://lig-log.com/enable-mfa-with-conditional-access/)

条件付きアクセスを利用することでユーザーが増えた場合でも、自動的にMFAを適用することが可能

多要素認証を要求されたら

[Office 365 の多要素認証(MFA)を有効化](https://lig-log.com/enable-multi-factor-authentication-for-office-365/)


![](https://lig-log.com/wp-content/uploads/2020/04/enable-multi-factor-authentication-for-office-365-05.png)



![](https://lig-log.com/wp-content/uploads/2020/04/enable-multi-factor-authentication-for-office-365-06.png)


##### セッション

[ポリシー 1:サインイン頻度コントロール](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/howto-conditional-access-session-lifetime#policy-1-sign-in-frequency-control)

### レポート専用モード

条件付きアクセス ポリシーの影響を評価するために使用できるモードです。<br>レポート専用モードでは、ポリシーが適用された場合にどのような結果になるかをレポートとして確認できますが、実際にはポリシーは強制されません。

[条件付きアクセスのレポート専用モードとは](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/concept-conditional-access-report-only)

管理者が環境で条件付きアクセス ポリシーを有効にする前に、その影響を評価することができる

## 認証

### 認証方法ポリシー

[認証方法ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-methods-manage?source=recommendations#authentication-methods-policy)

Azure 認証方法ポリシーでは、ユーザーが Azure Active Directory (Azure AD) にサインインする際に使用できる認証方法を管理できる

#### パスワードレス認証オプション

[Azure Active Directory のパスワードレス認証オプション](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-authentication-passwordless)

Windows Hello for Business<br>Microsoft Authenticator<br>FIDO2 セキュリティ キー

### パスワード保護

[Azure Active Directory パスワード保護を使用して不適切なパスワードを排除する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-password-ban-bad)

[パスワードの評価方法](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-password-ban-bad#how-are-passwords-evaluated)

ユーザーが自分のパスワードを変更またはリセットすると、<br>グローバルとカスタムの禁止パスワード リストから結合された用語リストに対して新しいパスワードを検証することで、その強度と複雑さがチェックされます。

[オンプレミスの Azure Active Directory パスワード保護を計画してデプロイする](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-password-ban-bad-on-premises-deploy)

#### 監査モード

[監査モード](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-password-ban-bad-on-premises-operations#audit-mode)

現在のポリシーが監査モードに構成されている場合、"不正な" パスワードは、イベント ログ メッセージが生成される原因となりますが、処理されて更新されます。

#### 強制モード

[強制モード](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-password-ban-bad-on-premises-operations#enforced-mode)

強制モードが有効になっている場合は、ポリシーに従って安全でないと見なされたパスワードは拒否されます。

### 多要素認証

[Azure Active Directory の多要素認証のデプロイを計画する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-getstarted)

[チュートリアル:Azure AD Multi-Factor Authentication を使用してユーザーのサインイン イベントのセキュリティを確保する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/tutorial-enable-azure-mfa)

[Azure AD Multi-Factor Authentication の設定を構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-mfasettings)

[演習 - Azure AD Multi-Factor Authentication の有効化](https://learn.microsoft.com/ja-jp/training/modules/secure-aad-users-with-mfa/4-exercise-mfa)


![](https://learn.microsoft.com/ja-jp/training/modules/secure-aad-users-with-mfa/media/4-set-mfa.png)


[Azure AD Multi-Factor Authentication におけるユーザーの状態](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-mfa-userstates#azure-ad-multi-factor-authentication-user-states)

[無効]: ユーザーごとの Azure AD Multi-Factor Authentication に登録されていないユーザーの状態です。<br>[有効]: 管理者がユーザーをユーザーごとの Azure AD Multi-Factor Authentication に登録したユーザーの状態です。この状態では、サインイン時に登録プロセスを完了する必要があります。<br>[強制]: サインイン時に Azure AD Multi-Factor Authentication が必要

### 統合された登録

[Azure Active Directory での統合されたセキュリティ情報の登録の概要](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/concept-registration-mfa-sspr-combined)

[Azure Active Directory での統合されたセキュリティ情報の登録の有効化](https://learn.microsoft.com/ja-jp/azure/active-directory/authentication/howto-registration-mfa-sspr-combined)

統合された登録を有効にするには、次の手順に従います。<br>Azure portal に ユーザー管理者 または 全体管理者 としてサインインします。

[ユーザーは１回登録でMFAとSSPRの両方を利用できますか。](https://cloudsteady.jp/post/37647/)

ユーザーは 1 回登録して Azure AD Multi-Factor Authentication (MFA)とセルフサービス パスワード リセット(SSPR)の両方の利用が可能です。<br>統合される前、ユーザーは Azure AD Multi-Factor Authentication (MFA) とセルフサービス パスワード リセット (SSPR) の認証方法を別々に登録しましたが、2020年8月15日の以降は、すべての新しい Azure AD テナントで、統合された登録が自動的に有効になりました。

## Identity Protection

Identity Protection を使用して組織内の ID のリスクを特定し、対処する

[Identity Protection とは](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/overview-identity-protection)

- ID ベースのリスクの＂検出と修復＂の自動化<br>- ポータルのデータを使用したリスクの調査<br>- リスク検出データを他のツールにエクスポート

[必要なロール](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/overview-identity-protection#required-roles)

[ライセンスの要件](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/overview-identity-protection#license-requirements)

Azure AD Premium P2 ライセンスが必要

Identity Protection は Microsoft が持つ脅威の検出ソリューションの一つで <br>Azure Advanced Threat Protection や Microsoft Cloud App Security と連携し ID に関するリスクを検出 /管理 / 保護することができます。


![](https://jpazureid.github.io/blog/azure-active-directory/identity-protection-riskpolicy-introduction/003.png)


[Azure AD Identity Protection をデプロイする](https://learn.microsoft.com/ja-jp/training/modules/azure-ad-identity-protection/?wt.mc_id=esi_m2l_content_wwl)

[Azure AD Identity Protectionのリスク検出を試してみた](https://dev.classmethod.jp/articles/azure-ad-identity-based-risk-detection/)

[1.1.3. Azure AD Identity Protection](https://github.com/naonao71/note/blob/main/AZ-500/memo.md#113-azure-ad-identity-protection)

### アクセスロール

[必要なロール](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/overview-identity-protection#required-roles)

### サインイン リスク

[サインイン リスク](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-risks#sign-in-risk)

### ユーザー リスク

Identity Protection では、ユーザーの標準的な行動であると確信できるものは何かを判断し、それを使用してユーザーのリスクに関する意思決定を行うことがでる <br>"ユーザー リスク" とは、ID が侵害されている 確率の計算<br> 管理者は、このリスク スコア信号に基づいて、組織の要件を適用するかどうかを決定できる

### リスク レベル

[リスク レベル](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/overview-identity-protection#risk-levels)

Identity Protection では、リスクを低、中、高の複数のレベルに分類

ポリシー作成の最初のステップとして、アラートをトリガーする Identity Protection のレベルを選択する必要があります。<br>Microsoft の推奨事項は、ユーザー ポリシーのしきい値を高に設定し、サインイン リスク ポリシーを中以上に設定し、自己修復オプションを有効にすることです。


![](https://www.examtopics.com/assets/media/exam-media/04258/0006300001.jpg)


### リスク ポリシー

[リスクベースのアクセス ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-policies)

[リスク ポリシーを構成して有効にする](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/howto-identity-protection-configure-risk-policies)

Azure Active Directory (Azure AD) の条件付きアクセスには、リスクへの対応を自動化し、リスクが検出されたときにユーザーが自己修復できるようにするために設定できる、2 種類のリスク ポリシーがあります。

[割り当て] で、 [ユーザーまたはワークロード ID] を選択します。<br>[Include](含める) で、 [すべてのユーザー] を選択します。<br>[除外] で、 [ユーザーとグループ] を選択し、組織の緊急アクセス用または非常用アカウントを選択します。


![](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/media/howto-identity-protection-configure-risk-policies/sign-in-risk-conditions.png)


[Identity Protection 2 つのリスク ポリシーの導入メリットについて](https://jpazureid.github.io/blog/azure-active-directory/identity-protection-riskpolicy-introduction/)


![](https://jpazureid.github.io/blog/azure-active-directory/identity-protection-riskpolicy-introduction/004.png)


#### サインイン リスク ポリシー

不審なサインイン試行を識別して対処<br>Azure AD Multi-Factor Authentication を使用して追加の検証フォームを提供するようユーザーに求めることができます。

[サインイン リスクベースの条件付きアクセス ポリシー](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/concept-identity-protection-policies#sign-in-risk-based-conditional-access-policy)

次のような要件を含むサインイン リスクに基づいてアクセス制御を適用できます。<br>アクセスのブロック<br>アクセスを許可<br>多要素認証を要求する

 注意<br>サインイン リスク ポリシーをトリガーする前に、ユーザーは Azure AD Multifactor Authentication に事前に登録しておく必要があります。

[サインイン リスク ポリシーを実装する](https://learn.microsoft.com/ja-jp/training/modules/azure-ad-identity-protection/5-sign-risk-policy)

[Azure ADのIdentity Protectionを設定する](https://lig-log.com/configuring-identity-protection-for-azure-ad/)


![](https://lig-log.com/wp-content/uploads/2021/06/configuring-identity-protection-for-azure-ad-08.png)


「低以上」だと検知の頻度が多くなる可能性があるので、MS推奨は「中以上」です。


![](https://lig-log.com/wp-content/uploads/2021/06/configuring-identity-protection-for-azure-ad-09.png)



![](https://lig-log.com/wp-content/uploads/2021/06/configuring-identity-protection-for-azure-ad-10.png)


[一般的な条件付きアクセス ポリシー: サインイン リスク ベースの多要素認証](https://learn.microsoft.com/ja-jp/azure/active-directory/conditional-access/howto-conditional-access-policy-risk)

このポリシーを構成できる場所は 2 つあります。1 つは条件付きアクセスで、もう 1 つは Identity Protection です。<br><br>ユーザーが MFA に登録されていない場合、危険なサインインがブロックされ、AADSTS53004 エラーが表示されます。

#### ユーザー リスク ポリシー

資格情報が侵害された可能性のあるユーザー アカウントを識別して対処<br>ユーザーに新しいパスワードの作成を促すことができる

[ユーザー リスク ポリシーを実装する](https://learn.microsoft.com/ja-jp/training/modules/azure-ad-identity-protection/4-user-risk-policy)

管理者は、<br>- アクセスをブロックする<br>- アクセスを許可する<br>- アクセスを許可するが Azure AD のセルフサービス パスワード リセット を使用してパスワードを変更する必要がある<br>ことを選択できます。


![](https://learn.microsoft.com/ja-jp/training/wwl-azure/azure-ad-identity-protection/media/az500-user-risk-policy-41559c0a.png)


[Azure ADのIdentity Protectionを設定する](https://lig-log.com/configuring-identity-protection-for-azure-ad/)


![](https://lig-log.com/wp-content/uploads/2021/06/configuring-identity-protection-for-azure-ad-13.png)



![](https://lig-log.com/wp-content/uploads/2021/06/configuring-identity-protection-for-azure-ad-14.png)



![](https://lig-log.com/wp-content/uploads/2021/06/configuring-identity-protection-for-azure-ad-15.png)


### 多要素認証登録ポリシー

ユーザーが Azure AD Multi-Factor Authentication に登録されているかどうかを確認 <br>サインイン リスク ポリシーによって MFA を要求する場合は、ユーザーが Azure AD Multi-Factor Authentication に既に登録されている必要がある

[方法: Azure AD 多要素認証登録ポリシーを構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/identity-protection/howto-identity-protection-configure-mfa-policy)

### レポート

#### 危険なユーザー

危険なユーザー レポートによって提供される情報を使用して、管理者は、以下を見つけることができる<br>- どのユーザーにリスクがあり、リスクが修復されたか無視されたか<br>- 検出の詳細<br>- すべての危険なサインインの履歴<br>- リスクの履歴<br><br>管理者は、これらのイベントに対するアクションを選ぶことができる<br>- ユーザー パスワードをリセットする<br>- ユーザーの侵害を確認する<br>- ユーザー リスクを無視する<br>- ユーザーによるサインインをブロックする<br>- Azure ATP を使用してさらに調査する

#### リスクの高いサインイン

#### リスク検出

## アプリケーション管理

[Azure Active Directory でのアプリケーション管理とは](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/what-is-application-management)

Azure ADのアプリケーション管理は、クラウドでアプリケーションを作成、構成、管理、および監視するプロセスです。<br>アプリケーションが Azure AD テナントに登録されると、そのアプリケーションに割り当てられているユーザーは安全にアクセスできます。<br>さまざまな種類のアプリケーションを Azure AD に登録できます。

### Microsoft ID プラットフォーム

#### 認証

[認証と承認](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/authentication-vs-authorization)

##### OAuth 2.0

[Microsoft ID プラットフォームにおける OAuth 2.0 と OpenID Connect (OIDC)](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-v2-protocols)

[Microsoft ID プラットフォームと OAuth 2.0 認証コード フロー](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/v2-oauth2-auth-code-flow)

[Microsoft ID プラットフォームと暗黙的な許可のフロー](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/v2-oauth2-implicit-grant-flow?source=recommendations)

[OAuth 2.0 コード付与フローを使用して Azure Active Directory Web アプリケーションへアクセスを承認する](https://learn.microsoft.com/ja-jp/azure/active-directory/azuread-dev/v1-protocols-oauth-code)

#### アプリケーション登録

[Azure Active Directory のアプリケーション オブジェクトとサービス プリンシパル オブジェクト](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/app-objects-and-service-principals)

[アプリケーションの登録](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/app-objects-and-service-principals#application-registration)

ID とアクセスの管理機能を Azure AD に委任するには、アプリケーションを Azure AD のテナントに登録する必要がある<br>アプリケーションを Azure AD に登録するときに、アプリケーションの ID 構成を作成する。これによって Azure AD との連携が可能となる。 <br>Azure portal でアプリを登録するときに、それがシングル テナントかマルチテナントかを選択し、必要に応じて **リダイレクト URI** を設定する。

ポータルでアプリケーションを登録すると、ホーム テナント に アプリケーション オブジェクト と サービス プリンシパル オブジェクト が 自動的に 作成される。 <br>Microsoft Graph API を使用してアプリケーションを登録または作成する場合、サービス プリンシパル オブジェクトの作成は別の手順。

[Azure ADのアプリの登録とは](https://azuread.net/archives/9397)

[AD テナントへのアプリケーションの登録](https://learn.microsoft.com/ja-jp/azure/active-directory/azuread-dev/v1-protocols-oauth-code#register-your-application-with-your-ad-tenant)

[アプリケーションを Azure AD に追加する方法と理由](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-how-applications-are-added)

[アプリケーションを Azure AD と統合する理由](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-how-applications-are-added#why-do-applications-integrate-with-azure-ad)

アプリケーションは、Azure AD が提供するサービスを利用するために Azure AD に登録される

[「ユーザーはアプリケーションを登録できる」の設定について](https://jpazureid.github.io/blog/azure-active-directory/users-can-register-applications/)

Azure Active Directory の [ユーザー設定] で、「ユーザーはアプリケーションを登録できる」を「いいえ」に変更することによって、一般ユーザーによるアプリの登録を行えなくすることが可能

##### サービス プリンシパル

[サービス プリンシパル オブジェクト](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/app-objects-and-service-principals#service-principal-object)

[【Azure】サービスプリンシパルを整理しよう](https://qiita.com/hikaru_motomiya/items/a5210ed567a02a2720f4)

AzureADに作成したアプリケーションのID・パスワードの認証を委任することができる機能


![](https://camo.qiitausercontent.com/ca8daf0eb4f5d9b2ce3160f22c92c5960d177451/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3632363333382f32376265623163652d646665352d326533612d666433632d3739643230316635643132312e706e67)


#### アプリケーション所有権

[Azure Active Directory のエンタープライズ アプリケーション所有権の概要](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/overview-assign-app-owners)

- Azure Active Directory (Azure AD) のユーザーは、アプリケーションを登録すると、アプリケーション所有者として自動的に追加されます。<br>- エンタープライズ アプリケーションの所有権は、<br>管理者ロール (グローバル管理者、アプリケーション管理者など) を持たないユーザーが、<br>新しいアプリケーションの登録を作成したときにのみ、既定で割り当てられます。 <br>- それ以外の場合、既定ではエンタープライズ アプリケーションに所有権は割り当てられません。 <br>- ユーザーはエンタープライズ アプリケーションの所有者になることができますが、グループを所有者として割り当てることはできません。

### アクセス管理

#### アクセス許可

[アクセス許可と同意の概要](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/permissions-consent-overview)

##### 委任されたアクセス許可

[委任アクセス (ユーザーの代わりにアクセス)](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/permissions-consent-overview#delegated-access-access-on-behalf-of-a-user)

ユーザーがクライアント アプリケーションにサインインしています。 <br>クライアント アプリケーションは、ユーザーの代わりにリソースにアクセスします。 <br>委任アクセスでは、委任されたアクセス許可が必要です。 

##### アプリケーションのアクセス許可

[アプリ専用のアクセス (ユーザーが関与しないアクセス)](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/permissions-consent-overview#app-only-access-access-without-a-user)

ユーザーがサインインしていない状態でアプリケーションが単独で動作します

[アプリケーションへのアプリ ロールの割り当て](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/howto-add-app-roles-in-azure-ad-apps#assign-app-roles-to-applications)

アプリケーションにアプリ ロールを割り当てるときは、"アプリケーションのアクセス許可" を作成します。 <br>通常、アプリケーションのアクセス許可は、認証および承認された API 呼び出しをユーザーによる操作なしで行う必要がある、デーモン アプリまたはバックエンド サービスによって使用されます。

[Microsoft Graph にアクセスするためのアクセス許可を追加する](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/quickstart-configure-app-access-web-apis#add-permissions-to-access-microsoft-graph)

#### 同意

アプリケーションにアクセス権を付与することを、リソース所有者が "承認"する

[アクセス許可と同意の概要](https://learn.microsoft.com/ja-jp/azure/active-directory/develop/permissions-consent-overview)

[Azure Active Directory におけるユーザーと管理者の同意](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/user-admin-consent-overview)

[管理者の同意ワークフローの構成](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/configure-admin-consent-workflow)

管理者の同意ワークフローを有効にするには、グローバル管理者である必要があります

[アプリケーションに対してテナント全体の管理者の同意を付与する](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/grant-admin-consent?pivots=portal)

グローバル管理者または特権ロール管理者：任意の API に対してアクセス許可を要求するアプリに同意を付与<br>クラウド アプリケーション管理者またはアプリケーション管理者：任意の API に対してアクセス許可を要求するアプリに同意を付与

##### ユーザーの同意

##### 管理者の同意

##### 事前承認

#### ユーザー割り当て

[アプリケーションにユーザーとグループを割り当てる](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/assign-user-or-group-access-portal?pivots=portal)

アプリケーションにユーザーを割り当てると、そのアプリケーションが、簡単にアクセスできるようにユーザーの [マイ アプリ] ポータルに表示されます。 <br>アプリケーションでアプリ ロールが公開されている場合は、ユーザーに特定のアプリ ロールを割り当てることもできます。

グループをアプリケーションに割り当てると、そのグループ内のユーザーのみがアクセスできるようになります。 <br>割り当ては、入れ子になったグループにはカスケードされません。

グループベースの割り当てには、Azure Active Directory Premium P1 または P2 エディションが必要です。 <br>グループ ベースの割り当てがサポートされるのはセキュリティ グループのみです。 <br>入れ子になったグループ メンバーシップと Microsoft 365 グループは、現在サポートされていません。

### マイ アプリ

[マイ アプリ ポータルの概要](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/myapps-overview)

マイ アプリは、Azure Active Directory (Azure AD) でアプリケーションを管理および起動するために使用される Web ベースのポータル<br>マイ アプリでアプリケーションを操作するには、Azure AD の組織アカウントを使用し、Azure AD管理者によって付与されるアクセス権を取得

#### セルフサービス アプリケーション

[Azure AD でユーザーをアプリケーションに割り当てる方法](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/ways-users-get-assigned-to-applications#how-do-users-get-assigned-an-application-in-azure-ad)

管理者が [アプリケーションのセルフ サービス アクセス] を有効にして、ビジネス承認なしでユーザーがマイ アプリの [アプリの追加] 機能を使用してアプリケーションを追加することを許可します

[セルフサービス アプリケーションの割り当てを有効にする](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/manage-self-service-access)

[セルフサービス アクセス](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/myapps-overview#self-service-access)

アクセス権は、テナント レベルで付与したり、特定のユーザーに割り当てたり、**セルフサービス アクセス** から付与したりできます。 <br>ユーザーが **マイ アプリ ポータル** から自分でアプリケーションを見つけられるようにするには、Azure portal で **セルフサービス アプリケーション アクセスを有効** にします。 

[従業員エンパワーメントを促進してヘルプ デスク問い合わせを減らす](https://www.microsoft.com/ja-jp/security/business/identity-access/azure-active-directory-user-self-service-portals)

#### マイ アプリ ポータル

マイ アプリ ポータルは、Azure Active Directory (Azure AD) のマイ アプリと呼ばれるWebベースのポータルで、アプリの起動と管理を行うために使用されます。 <br>このページを使用すると、ユーザーは1か所で作業を開始し、アクセスできるすべてのアプリケーションを見つけることができます。

[マイ アプリ ポータルの概要](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/myapps-overview)

### SAML トークン暗号化

SAML トークン暗号化は、ID プロバイダーとサービス プロバイダー間で認証および認可データを交換するためのオープン標準である Security Assertion Markup Language (SAML) を使用して、Azure AD が発行する SAML トークンを暗号化する機能<br>SAML トークン暗号化を構成するには、次の手順が必要です。<br>- アプリケーションで構成されている秘密キーに一致する公開キー証明書を取得します。<br>- Azure AD のアプリケーション構成に証明書を追加します。<br>- アプリケーションの SAML 設定でトークン暗号化を有効にします。

[Azure Active Directory の SAML トークン暗号化を構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/manage-apps/howto-saml-token-encryption?tabs=azure-portal)

トークン暗号化を構成するには、公開キーを含んだ X.509 証明書ファイルを、アプリケーションを表す Azure AD アプリケーション オブジェクトにアップロードする必要があります。

## マネージド ID

マネージド ID は、さまざまなソフトウェア コンポーネント間の通信を保護するために使用されるシークレット/資格情報の管理に関して開発者が直面した課題に対応して作成されました。<br>マネージド ID により、開発者が資格情報を手動で管理する必要がなくなります。<br>マネージド ID は、アプリケーションが Azure AD 認証をサポートする任意のリソースに接続するために使用できる ID です。

[Azure リソースのマネージド ID とは](https://learn.microsoft.com/ja-jp/azure/active-directory/managed-identities-azure-resources/overview)

[ざっくり覚える、Azureサービス プリンシパルとマネージド ID](https://tech-blog.cloud-config.jp/2020-08-24-azure-authentication-tools/)

Azure によって提供される認証ツールは2つある<br>１）サービス プリンシパル<br>２）マネージド ID<br>２つともの機能的にはだいたい同じ。<br>サービスプリンシパルは、初期設定や情報管理の運用がめんどいので、Azure内の認証ツールは基本、簡単発行・運用ができるマネージドID利用が推奨。<br>マネージドID は、「オンプレミスのアプリケーション または サービス」 は未サポートなので、オンプレミス利用時はサービスプリンシパルを使わざるえない

[Azure PowerShell で自動化する時に使用する Identity について](https://ayuina.github.io/ainaba-csa-blog/azure-powershell-automation/)

### システム割り当て

Azure の一部のサービスでは、そのサービス インスタンスでマネージド ID を直接有効にするオプションが提供されます。<br>有効にするとすぐにシステムによって割り当てられたマネージド ID の場合、別の ID が AAD で作成され、サービス インスタンスのライフ サイクルにリンクされます。<br>その特定の ID を使用して AAD からトークンを要求できるのは、その Azure リソースだけです。

[マネージド ID の種類](https://learn.microsoft.com/ja-jp/azure/active-directory/managed-identities-azure-resources/overview#managed-identity-types)

- 特別な種類のサービス プリンシパルが、ID 用に Azure AD に作成されます。 このサービス プリンシパルは、その Azure リソースのライフサイクルに関連付けられます。 <br>Azure リソースが削除されると、Azure により自動的にサービス プリンシパルが削除されます。

#### VM

##### ロール割り当て

### ユーザー割り当て

ユーザー割り当てマネージド ID は、それを使用するリソースとは別に管理されます。<br>この分離により、この ID を Azure サービスの複数のインスタンスに割り当てることができます。

[マネージド ID の種類](https://learn.microsoft.com/ja-jp/azure/active-directory/managed-identities-azure-resources/overview#managed-identity-types)

- 特別な種類のサービス プリンシパルが、ID 用に Azure AD に作成されます。 サービス プリンシパルは、それを使うリソースとは別に管理されます。<br>- ユーザー割り当て ID は、複数のリソースで使用できます。

#### VM

### 最小特権の原則

[アクセス権を付与する場合は最小特権の原則に従う](https://learn.microsoft.com/ja-jp/azure/active-directory/managed-identities-azure-resources/managed-identity-best-practice-recommendations#follow-the-principle-of-least-privilege-when-granting-access)

例えば、<br>マネージド ID (ClientId = 1234) に StorageAccount7755 への読み取りおよび書き込みアクセス許可が付与され、LogicApp3388 に割り当てられている場合、<br>マネージド ID やストレージ アカウントに対する直接的な権限は持たないが、LogicApp3388 内でコードを実行する権限を持つ Alice は、そのマネージド ID を使用するコードを実行することで、StorageAccount7755 との間でデータの読み取りと書き込みを行うこともできます。


![](https://learn.microsoft.com/ja-jp/azure/active-directory/managed-identities-azure-resources/media/managed-identity-best-practice-recommendations/security-considerations.png)


## デバイス ID

[デバイス ID とは](https://learn.microsoft.com/ja-jp/azure/active-directory/devices/overview)

### Windows 仮想マシン

[Azure AD を使用して Azure の Windows 仮想マシンにログインする](https://learn.microsoft.com/ja-jp/azure/active-directory/devices/howto-vm-sign-in-azure-ad-windows)

[VM ロールの割り当てを構成する](https://learn.microsoft.com/ja-jp/azure/active-directory/devices/howto-vm-sign-in-azure-ad-windows#configure-role-assignments-for-the-vm)

Azure AD 資格情報を使用して VM にログインするには、最初に VM のロールの割り当てを構成する必要があります。<br>VM にログインできるユーザーを決定する Azure RBAC ポリシーを構成する必要があります。<br> VM へのログインを承認するには、次の 2 つの Azure ロールが使用されます。<br>- 仮想マシンの管理者ログイン: このロールを割り当てられたユーザーは、管理者特権を持つユーザーとして Azure 仮想マシンにログインできます。<br>- 仮想マシンのユーザー ログイン: このロールが割り当てられたユーザーは 正規ユーザーの権限を持つユーザーとして Azure 仮想マシンにログインできます。<br><br>注意<br>仮想マシンの管理者ログインと仮想マシンのユーザー ログインのロールは、dataActions を使用しているため、管理グループのスコープで割り当てることはできません。 現時点では、これらのロールは、サブスクリプション、リソース グループまたはリソース スコープでのみ割り当てることができます。

## Azure AD Domain Services

[Azure Active Directory Domain Services とは](https://learn.microsoft.com/ja-jp/azure/active-directory-domain-services/overview)

## アプリケーション プロキシ

Azure AD アプリケーション プロキシとは、オンプレミスの Web アプリケーションにリモートからアクセスできるようにする Azure AD の機能です。<br>Azure portal で構成し、外部のパブリック URL を発行して内部のアプリケーション サーバーに接続します。<br>VPN やリバース プロキシに代わるもので、ローミング (リモート) ユーザー向けです

[Azure AD アプリケーション プロキシを使用してリモート ユーザー向けにオンプレミス アプリを発行する](https://learn.microsoft.com/ja-jp/azure/active-directory/app-proxy/what-is-application-proxy)

